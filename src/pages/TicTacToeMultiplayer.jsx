import React, { useState, useEffect } from "react";
import {
  createRoom,
  joinRoom,
  updateRoom,
  fetchRoom,
} from "../logic/gameRoomApi";
import { Link } from "react-router-dom";
import { loadSettings } from "../logic/settings";

const emptyBoard = Array(9).fill(null);

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default function TicTacToeMultiplayerPage() {
  const [roomId, setRoomId] = useState("");
  const [myPlayerId, setMyPlayerId] = useState("");
  const [board, setBoard] = useState(emptyBoard);
  const [currentTurn, setCurrentTurn] = useState("X");
  const [myMark, setMyMark] = useState(null);
  const [status, setStatus] = useState("Not connected");
  const [joinCodeInput, setJoinCodeInput] = useState("");
  const settings = loadSettings() || {};
  const winner = calculateWinner(board);

  useEffect(() => {
    if (!roomId) return;

    const id = setInterval(async () => {
      try {
        const data = await fetchRoom(roomId);
        if (!data.state) return;
        setBoard(data.state.board ?? emptyBoard);
        setCurrentTurn(data.state.currentTurn ?? "X");
      } catch {
        // ignore
      }
    }, 1500);

    return () => clearInterval(id);
  }, [roomId]);

  async function handleCreateRoom() {
    try {
      const initialState = { board: emptyBoard, currentTurn: "X" };
      const data = await createRoom(initialState);
      setRoomId(data.roomId);
      setMyPlayerId(data.playerId);
      setMyMark("X");
      setStatus(`Created room ${data.roomId}. You are X.`);
    } catch (e) {
      setStatus(e.message);
    }
  }

  async function handleJoinRoom(e) {
    e.preventDefault();
    if (!joinCodeInput.trim()) return;
    try {
      const data = await joinRoom(joinCodeInput.trim());
      setRoomId(data.roomId);
      setMyPlayerId(data.playerId);
      setBoard(data.state?.board ?? emptyBoard);
      setCurrentTurn(data.state?.currentTurn ?? "X");
      setMyMark("O");
      setStatus(`Joined room ${data.roomId}. You are O.`);
    } catch (e) {
      setStatus(e.message);
    }
  }

  async function handleClickCell(index) {
    if (!roomId || !myMark) return;
    if (board[index] || winner) return;
    if (currentTurn !== myMark) return;

    const newBoard = board.slice();
    newBoard[index] = myMark;
    const nextTurn = myMark === "X" ? "O" : "X";
    const newState = { board: newBoard, currentTurn: nextTurn };

    setBoard(newBoard);
    setCurrentTurn(nextTurn);

    try {
      await updateRoom(roomId, myPlayerId, newState);
    } catch (e) {
      setStatus(e.message);
    }
  }

  function renderCell(i) {
    return (
      <button
        className="ttt-cell"
        onClick={() => handleClickCell(i)}
        data-testid={`cell-${i}`}
      >
        {board[i]}
      </button>
    );
  }

  let gameStatusText = "";
  if (winner) {
    gameStatusText = `Winner: ${winner}`;
  } else {
    gameStatusText = `Turn: ${currentTurn}`;
  }

  return (
    <div className="card">
      <div className="game-shell">
        <Link to="/">Back to hub</Link>
        <header>
          <h1>Multiplayer Tic Tac Toe</h1>

          <div data-testid="greeting">
            {settings?.name ? `Welcome, ${settings.name}!` : ""}
          </div>

          <div className="difficulty-info" id="current-difficulty">
            Difficulty: {settings?.difficulty || "normal"}
          </div>
        </header>

        <p>{status}</p>

        {!roomId && (
          <div className="room-controls">
            <button onClick={handleCreateRoom}>Create Room</button>

            <form onSubmit={handleJoinRoom}>
              <input
                placeholder="Enter room code"
                value={joinCodeInput}
                onChange={(e) => setJoinCodeInput(e.target.value)}
              />
              <button type="submit">Join Room</button>
            </form>
          </div>
        )}

        {roomId && (
          <div className="room-info">
            <p>Room ID: {roomId}</p>
            <p>Your mark: {myMark}</p>
            <p>{gameStatusText}</p>
          </div>
        )}

        <div className="ttt-board">
          <div className="ttt-row">
            {renderCell(0)}
            {renderCell(1)}
            {renderCell(2)}
          </div>
          <div className="ttt-row">
            {renderCell(3)}
            {renderCell(4)}
            {renderCell(5)}
          </div>
          <div className="ttt-row">
            {renderCell(6)}
            {renderCell(7)}
            {renderCell(8)}
          </div>
        </div>
      </div>
    </div>
  );
}
