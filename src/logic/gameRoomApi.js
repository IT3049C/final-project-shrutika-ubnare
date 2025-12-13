const API_BASE = "https://game-room-api.fly.dev/api";

export async function createRoom(gameState) {
  const res = await fetch(`${API_BASE}/rooms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ game: "tictactoe", state: gameState }),
  });
  if (!res.ok) throw new Error("Failed to create room");
  return res.json(); 
}

export async function joinRoom(roomId) {
  const res = await fetch(`${API_BASE}/rooms/${roomId}/join`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to join room");
  return res.json();
}

export async function updateRoom(roomId, playerId, gameState) {
  const res = await fetch(`${API_BASE}/rooms/${roomId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playerId, state: gameState }),
  });
  if (!res.ok) throw new Error("Failed to update room");
  return res.json(); 
}

export async function fetchRoom(roomId) {
  const res = await fetch(`${API_BASE}/rooms/${roomId}`);
  if (!res.ok) throw new Error("Failed to fetch room");
  return res.json(); 
}
