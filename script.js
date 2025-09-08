// Mock WebSocket (for demo purpose you can replace with real backend WebSocket server)
let ws;
let currentRoom = "";
let username = "";

document.getElementById("joinBtn").addEventListener("click", () => {
  username = document.getElementById("username").value.trim();
  if (!username) {
    alert("Enter a username!");
    return;
  }

  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("chat-container").classList.remove("hidden");

  // Connect WebSocket (replace with your server)
  ws = new WebSocket("wss://echo.websocket.org");

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.room === currentRoom) {
      addMessage(data.user, data.message, data.time);
    }
  };
});

// Create new room
document.getElementById("createRoomBtn").addEventListener("click", () => {
  const room = document.getElementById("newRoom").value.trim();
  if (room) {
    const li = document.createElement("li");
    li.textContent = room;
    li.addEventListener("click", () => joinRoom(room));
    document.getElementById("rooms").appendChild(li);
    document.getElementById("newRoom").value = "";
  }
});

// Send message
document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("messageInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function joinRoom(room) {
  currentRoom = room;
  document.getElementById("messages").innerHTML = "";
  addSystemMessage(`Joined room: ${room}`);
}

function sendMessage() {
  const message = document.getElementById("messageInput").value.trim();
  if (!message || !currentRoom) return;

  const data = {
    user: username,
    message: message,
    room: currentRoom,
    time: new Date().toLocaleTimeString()
  };

  ws.send(JSON.stringify(data));
  document.getElementById("messageInput").value = "";
}

function addMessage(user, message, time) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<strong>${user}</strong>: ${message} <small>(${time})</small>`;
  document.getElementById("messages").appendChild(div);
  div.scrollIntoView();
}

function addSystemMessage(msg) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<em>${msg}</em>`;
  document.getElementById("messages").appendChild(div);
}
