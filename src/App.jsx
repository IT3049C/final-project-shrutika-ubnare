import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { HubPage } from './pages/HubPage.jsx'
import { RPSGamePage } from './pages/RPSGamePage.jsx'
import { TicTacToePage } from './pages/TicTacToePage.jsx'
import { WordlePage } from './pages/WordlePage.jsx'
import { TypingSpeedTestPage } from './pages/TypingSpeedTestPage.jsx'
import { TicTacToeMultiplayerPage } from './pages/TicTacToeMultiplayer.jsx'

function App() {

  return (
    <div>
      <header className="site-header">
        <h1>GameHub</h1>
        <p>Built by Shrutika Ubnare</p>
        <nav aria-label="Main navigation">
          <Link to="/">Home</Link>{" "}
          <Link to="/rps">Rock Paper Scissors</Link>{" "}
          <Link to="/tictactoe">Tic Tac Toe</Link>{" "}
          <Link to="/wordle">Wordle</Link>{" "}
          <Link to="/typingspeedtest">Typing Speed Test</Link>{" "}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HubPage />} />
        <Route path="/rps" element={<RPSGamePage />} />
        <Route path="/tictactoe" element={<TicTacToePage />} />
        <Route path="/wordle" element={<WordlePage />} />
        <Route path="/typingspeedtest" element={<TypingSpeedTestPage />} />
        <Route path="/tictactoe-mp" element={<TictacToeMultiplayerPage />} />
      </Routes>
    </div>
  );
}

export default App
