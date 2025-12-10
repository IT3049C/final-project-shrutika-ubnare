import { useState } from "react";
import { Link } from "react-router-dom";
import { loadSettings } from "../logic/settings";
import { checkGuess, config, gameState, getRandomWord } from "../logic/wordle";

export function WordlePage() {
    const settings = loadSettings() || {};
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();

        if(guess.length !== config.wordLength) {
            setMessage(`Guess must be ${config.wordLength} letters`);
            return;
        }

        let result;
        try {
            result = await checkGuess(guess);
        } catch {
            result = null;
        }

        if (!result) {
            setMessage("Not a valid word");
            return;
        }

        const upper = guess.toUpperCase();
        setHistory((prev) => [...prev, { guess: upper, result }]);

        if (upper.toLowerCase() === gameState.targetWord.toLowerCase()) {
            setMessage("You found the word!");
        } else {
            setMessage("");
        }
        setGuess("");
    }
    function handleReset() {
        setGuess("");
        setMessage("");
        setHistory([]);
        gameState.currentAttempt = 0;
        gameState.currentPosition = 0;
        gameState.targetWord = getRandomWord();
    }

    return (
        <main className="card">
            <Link to="/">Back to hub</Link>
            <header>
                <h2>Wordle</h2>
                <div data-testid="greeting">
                    {settings?.name ? `Welcome, ${settings.name}!` : ""}
                </div>
                <Link to="/">Back to hub</Link>
            </header>

            <form onSubmit={handleSubmit}>
                <label htmlFor="wordle-guess">
                    Enter a {config.wordLength}-letter guess
                </label>
                <input 
                    id="wordle-guess"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                />
                <button type="submit">Submit guess</button>
            </form>

            {message && (
                <p role="status">
                    {message}
                </p>
            )}

            <ul aria-label="Guess history">
                {history.map((row, idx) => (
                    <li key={idx}>
                        {row.guess} - {row.result.join(" ")}
                    </li>
                ))}
            </ul>

            <button onClick={handleReset}>Reset Game</button>
        </main>
    );
}