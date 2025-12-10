import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadSettings } from "../logic/settings";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = "X";  
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every(Boolean)) {
    status = "Draw!";
  } else {
    status = "Next player: X";
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export function TicTacToeMultiplayerPage() {
  const settings = loadSettings() || {};
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const [roomCode, setRoomCode] = useState("");

  useEffect(() => {
    if (!roomCode) return;
    const interval = setInterval(() => {
    }, 1000);
    return () => clearInterval(interval);
  }, [roomCode]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const moves = history.map((squares, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  function handleJoinRoom() {
    setRoomCode(roomCode.trim());
  }

  return (
    <main className="game card">
      <Link to="/">Back to hub</Link>
      <header>
        <h2>Tic-Tac-Toe Multiplayer</h2>
        <p data-testid="greeting">
          {settings?.name ? `Welcome, ${settings.name}!` : ""}
        </p>
      </header>

      {!roomCode && (
        <div>
          <label htmlFor="room-code">Room Code:</label>
          <input
            id="room-code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <button type="button" onClick={handleJoinRoom}>
            Join Room
          </button>
        </div>
      )}

      <div className="game-board">
        <Board squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </main>
  );
}

function calculateWinner(squares) {
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
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
