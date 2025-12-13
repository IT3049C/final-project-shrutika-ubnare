import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadSettings } from "../logic/settings";

const TEST_DURATION = 30;

export function TypingSpeedTestPage() {
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [text, setText] = useState("");
  const settings = loadSettings() || {};

  function handleChange(e) {
    if (!started) {
      setStarted(true);
    }
    if (finished) {
      return;
    }
    setText(e.target.value);
  }

  useEffect(() => {
    if (!started || finished) return;

    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [started, finished]);

  useEffect(() => {
    if (timeLeft === 0 && started) {
      setFinished(true);
    }
  }, [timeLeft, started]);

  const wordsTyped = text.trim().length
    ? text.trim().split(/\s+/).length
    : 0;
  const minutesElapsed =
    (TEST_DURATION - timeLeft) > 0
      ? (TEST_DURATION - timeLeft) / 60
      : 0;
  const wpm =
    minutesElapsed > 0 ? Math.round(wordsTyped / minutesElapsed) : 0;

  function handleReset() {
    setTimeLeft(TEST_DURATION);
    setStarted(false);
    setFinished(false);
    setText("");
  }

  return (
    <div className="card">
      <div className="game-shell">
        <Link to="/">Back to hub</Link>
        <header>
          <h1>Typing Speed Test</h1>
          <div data-testid="greeting">
            {settings?.name ? `Welcome, ${settings.name}!` : ""}
          </div>

          <div className="difficulty-info" id="current-difficulty">
            Difficulty: {settings?.difficulty || "normal"}
          </div>
        </header>

        <p>Time left: {timeLeft}s</p>

        <textarea
          value={text}
          onChange={handleChange}
          disabled={finished}
          placeholder="Start typing to begin the test..."
          rows={6}
          cols={60}
        />

        <div className="typing-stats">
          <p>Words typed: {wordsTyped}</p>
          <p>Estimated WPM: {wpm}</p>
        </div>

        <button onClick={handleReset}>Reset</button>

        {finished && <p>Time is up! You can reset to try again.</p>}
      </div>
    </div>
  );
}
