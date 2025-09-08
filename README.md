Chat Application

A real-time web-based chat platform where users can join chat rooms, exchange messages instantly, and enjoy an interactive chatting experience. Built with HTML, CSS, and JavaScript.

🚀 Features

User authentication with unique usernames

Create and join chat rooms

Real-time messaging using WebSockets

Message timestamps and sender information

Responsive design for mobile and desktop

Scrollable chat window with automatic scroll to new messages

Basic message formatting (bold, italics, links) support

chat-application/
│
├── index.html      # Main HTML file (UI structure)
├── style.css       # Styling (responsive design)
├── script.js       # Real-time chat logic with WebSockets
└── README.md       # Documentation

🛠️ Technologies Used

HTML5 – UI structure

CSS3 – Styling and responsive layout

JavaScript (ES6) – Client-side logic

WebSockets – Real-time communication

git clone https://github.com/your-username/chat-application.git
cd chat-application

git clone https://github.com/your-username/chat-application.git
cd chat-application

mkdir server && cd server
npm init -y
npm install express socket.io

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chatMessage", (data) => {
    io.to(data.room).emit("chatMessage", data);
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));
