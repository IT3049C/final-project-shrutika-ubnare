import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loadSettings } from "../logic/settings";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
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
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ squares, onPlayerMove }) {
  const winner = calculateWinner(squares);
  const isFull = squares.every(Boolean);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (isFull) {
    status = "Draw!";
  } else {
    status = "Your turn (X)";
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => onPlayerMove(0)} />
        <Square value={squares[1]} onSquareClick={() => onPlayerMove(1)} />
        <Square value={squares[2]} onSquareClick={() => onPlayerMove(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => onPlayerMove(3)} />
        <Square value={squares[4]} onSquareClick={() => onPlayerMove(4)} />
        <Square value={squares[5]} onSquareClick={() => onPlayerMove(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => onPlayerMove(6)} />
        <Square value={squares[7]} onSquareClick={() => onPlayerMove(7)} />
        <Square value={squares[8]} onSquareClick={() => onPlayerMove(8)} />
      </div>
    </>
  );
}

export function TicTacToePage() {
  const settings = loadSettings() || {};
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsPlayerTurn(true);
  }

  function makeCpuMove(current) {
    if (calculateWinner(current)) return;

    const emptyIndices = current
      .map((val, idx) => (val === null ? idx : null))
      .filter((idx) => idx !== null);

    if (emptyIndices.length === 0) return;

    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

    const next = current.slice();
    next[randomIndex] = "O";
    setSquares(next);
    setIsPlayerTurn(true);
  }

  function handlePlayerMove(i) {
    if (!isPlayerTurn) return;
    if (squares[i] || calculateWinner(squares)) return;

    const next = squares.slice();
    next[i] = "X";
    setSquares(next);
    setIsPlayerTurn(false);

    setTimeout(() => makeCpuMove(next), 300);
  }

  const winner = calculateWinner(squares);
  const isFull = squares.every(Boolean);

  return (
    <main className="card">
      <div className="game-shell">
        <Link to="/">Back to hub</Link>
        <header>
          <h1>Tic-Tac-Toe</h1>
          <p data-testid="greeting">
            {settings?.name ? `Welcome, ${settings.name}!` : ""}
          </p>
          <div className="difficulty-info" id="current-difficulty">
            Difficulty: {settings?.difficulty || "normal"}
          </div>
        </header>

        <div className="game-board">
          <Board squares={squares} onPlayerMove={handlePlayerMove} />
        </div>

        <div className="game-info">
          <button onClick={resetGame}>Reset game</button>
          {winner && <p>Game over! Winner: {winner}</p>}
          {!winner && isFull && <p>Game over! It&apos;s a draw.</p>}
        </div>
      </div>
    </main>
  );
}
