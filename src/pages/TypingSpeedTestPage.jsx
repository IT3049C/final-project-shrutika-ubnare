import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadSettings } from "../logic/settings";

const SAMPLE_TEXT = "Typing games are fun and help you practice speed and accuracy.";

const TEST_DURATION_SECONDS = 30;

export function TypingSpeedPage() {
  const settings = loadSettings() || {};
  const [text] = useState(SAMPLE_TEXT);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft <= 0) {
      setIsRunning(false);
      computeResults();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [isRunning, timeLeft]);

  function startTest() {
    setInput("");
    setTimeLeft(TEST_DURATION_SECONDS);
    setIsRunning(true);
    setWpm(0);
    setAccuracy(100);
  }

  function handleChange(e) {
    if (!isRunning) return;
    setInput(e.target.value);
  }

  function computeResults() {
    const wordsTyped = input.trim().split(/\s+/).filter(Boolean).length;
    const minutes = TEST_DURATION_SECONDS / 60;
    const computedWpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
    const len = Math.min(input.length, text.length);

    let correctChars = 0;
    for (let i = 0; i < len; i++) {
      if (input[i] === text[i]) correctChars++;
    }
    const totalChars = input.length || 1;
    const computedAccuracy = Math.round((correctChars / totalChars) * 100);

    setWpm(computedWpm);
    setAccuracy(computedAccuracy);
  }

  function handleReset() {
    setInput("");
    setTimeLeft(TEST_DURATION_SECONDS);
    setIsRunning(false);
    setWpm(0);
    setAccuracy(100);
  }

  return (
    <main className="card">
      <header>
        <h2>Typing Speed Test</h2>
        <div data-testid="greeting">
          {settings?.name ? `Welcome, ${settings.name}!` : ""}
        </div>
        <Link to="/">Back to hub</Link>
      </header>

      <section aria-label="Text to type">
        <p>{text}</p>
      </section>

      <section aria-label="Typing controls">
        <p>Time left: {timeLeft}s</p>
        <button type="button" onClick={startTest}>
          Start test
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        <div>
          <label htmlFor="typing-input">Type here</label>
          <textarea
            id="typing-input"
            rows={4}
            value={input}
            onChange={handleChange}
            disabled={!isRunning}
          />
        </div>
      </section>

      <section aria-label="Results">
        <p>WPM: {wpm}</p>
        <p>Accuracy: {accuracy}%</p>
      </section>
    </main>
  );
}
