import { useState } from "react";
import { loadSettings } from "../logic/settings";
import { decideWinner, getCpuMove, nextScore } from "../logic/rps";
import { Link } from "react-router-dom";


export function RPSGamePage() {
    const settings = loadSettings() || {};
    const [score, setScore] = useState({player: 0, cpu:0, ties: 0});
    const [history, setHistory] = useState([]);
    const [lastPlayerMove, setLastPlayerMove] = useState(null);

    function handleMove(playerMove) {
    const cpuMove = getCpuMove({
      difficulty: settings?.difficulty || "normal",
      lastPlayerMove
    });

    const outcome = decideWinner(playerMove, cpuMove);
    setScore(prev => nextScore(prev, outcome));
    setHistory(prev => [
      ...prev,
      { playerMove, cpuMove, outcome }
    ]);
    setLastPlayerMove(playerMove);
  }

  function handleReset() {
    setScore({ player: 0, cpu: 0, ties: 0 });
    setHistory([]);
    setLastPlayerMove(null);
  }

  return (
    <main className="card">
      <Link to="/">Back to hub</Link>
      <header>
        <h2>Rock Paper Scissors</h2>
      </header>

      <div data-testid="greeting">
        {settings?.name ? `Welcome, ${settings.name}!` : ""}
      </div>

      <div className="difficulty-info" id="current-difficulty">
        Difficulty: {settings?.difficulty || "normal"}
      </div>

      <div className="game-actions">
        <button data-move="rock" onClick={() => handleMove("rock")} aria-label="Play Rock"> 
          Rock
        </button>
        <button data-move="paper" onClick={() => handleMove("paper")} aria-label="Play Paper">
          Paper
        </button>
        <button data-move="scissors" onClick={() => handleMove("scissors")} aria-label="Play Scissors">
          Scissors
        </button>
      </div>

      <div className="score-row">
        <div>Player: <span id="score-player">{score.player}</span></div>
        <div>CPU: <span id="score-cpu">{score.cpu}</span></div>
        <div>Ties: <span id="score-ties">{score.ties}</span></div>
      </div>

      <ul id="history" aria-label="Game history">
        {history.map((entry, idx) => (
          <li key={idx}>
            {`Player(${entry.playerMove}) vs CPU(${entry.cpuMove}) — ${entry.outcome}`}
          </li>
        ))}
      </ul>

      <button id="reset-game" onClick={handleReset}>Reset Game</button>
    </main>
  );
}

