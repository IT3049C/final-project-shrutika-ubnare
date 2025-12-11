import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {loadSettings, saveSettings } from '../logic/settings'

export function HubPage() {
    const existing = loadSettings() || {};
    const [name, setName] = useState(existing.name || "");
    const [difficulty, setDifficulty] = useState(existing.difficulty || "normal");
    const navigate = useNavigate();

    function persistSettings()  {
        const newSettings = { ...existing, name, difficulty };
        saveSettings(newSettings);
    }

    function handleSave(e) {
        e.preventDefault();
        persistSettings();
    }

    function handleGoToGame(path) {
        persistSettings();
        navigate(path);
    }

    return (
        <main className="hub">
            <header>
                <h1>GameHub</h1>
                <p>Built by Shrutika Ubnare</p>
            </header>
            <section aria-labelledby="player-settings">
                <h2 id="player-settings">Player settings</h2>
                <form onSubmit={handleSave}>
                    <label htmlFor="player-name">Player name</label>
                    <input 
                    id="player-name"
                    name="player-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="difficulty">RPS diffiiculty</label>
                    <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="easy">Easy</option>
                        <option value="normal">Normal</option>
                        <option value="hard">Hard</option>
                    </select>

                    <button type="submit">Save settings</button>
                </form>
            </section>

            <section aria-labelledby="games-list">
                <h2 id="games-list">Available games</h2>
                <ul className = "game-list">
                    <li>
                        <button
                        type="button"
                        onClick={() => handleGoToGame("/rps")}
                        >
                            Play Rock Paper Scissors
                        </button>
                    </li>
                    <li>
                        <button
                        type="button"
                        onClick={() => handleGoToGame("/wordle")}
                        >
                            Play Wordle
                        </button>
                    </li>
                    <li>
                        <button
                        type="button"
                        onClick={() => handleGoToGame("/typingspeedtest")}
                        >
                            Play Typing Speed Test
                        </button>
                    </li>
                    <li>
                        <button
                        type="button"
                        onClick={() => handleGoToGame("/tictactoe")}
                        >
                            Play Tic Tac Toe
                        </button>
                    </li>
                    <li>
                        <button 
                        type="button"
                        onClick={() => handleGoToGame("/tictactoe-mp")}
                        >
                            Play Tic Tac Toe Multiplayer
                        </button>
                    </li>
                </ul>
            </section>
        </main>
    );
}
