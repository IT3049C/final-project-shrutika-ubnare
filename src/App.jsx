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
    <Routes>
      <Route path="/" element={<HubPage />} />
      <Route path="/rps" element={<RPSGamePage />} />
      <Route path="/wordle" element={<WordlePage />} />
      <Route path="/typingspeedtest" element={<TypingSpeedTestPage />} />
      <Route path="/tictactoe" element={<TicTacToePage />} />
      <Route path="/tictactoe-mp" element={<TicTacToeMultiplayerPage />} />
    </Routes>
  );
}

export default App
