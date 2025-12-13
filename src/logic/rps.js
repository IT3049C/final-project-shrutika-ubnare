const MOVES = ["rock", "paper", "scissors"];

export function getCpuMove({ difficulty = "normal",
    lastPlayerMove = null }) {
        if (difficulty === "easy") {
            return "rock";
        }
        if (difficulty === "hard" && lastPlayerMove) {
            if (lastPlayerMove === "rock") return "paper";
            if (lastPlayerMove === "paper") return "scissors";
            if (lastPlayerMove === "scissors") return "rock";
        }

        const idx = Math.floor(Math.random() * MOVES.length);
        return MOVES[idx];
    }

    export function decideWinner(playerMove, cpuMove) {
        if (playerMove === cpuMove) return "tie";
        if (
            (playerMove === "rock" && cpuMove === "scissors") ||
            (playerMove === "paper" && cpuMove === "rock") ||
            (playerMove === "scissors" && cpuMove === "paper")
        ) {
            return "player";
        }
        return "cpu";
    }

    export function nextScore(prev, outcome) {
        if (outcome === "player") {
            return { ...prev, player: prev.player + 1};
        }
        if (outcome === "cpu") {
            return { ...prev, cpu: prev.cpu + 1};
        }
        return { ...prev, ties: prev.ties + 1};
    }