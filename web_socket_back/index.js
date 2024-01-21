import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.set("port", 3001);

// HTTP server 생성
const server = http.createServer(app);

// Socket.io server 생성
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// 방에 있는 유저 정보
let users = {};
// socket.id기준 방 정보
let socketRoom = {};
// 방에 최대 2명까지만 허용
const MAX_USER = 2;

io.on("connection", (socket) => {
  console.log("user connected : ", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("user joined room : ", data);
  });

  socket.on("send_message", (data) => {
    // 메시지 데이터에 사용자 ID(socket.id) 추가
    console.log("data", data);
    const messageData = {
      ...data,
      userId: socket.id,
    };
    socket.to(data.room).emit("receive_message", messageData);
    console.log(data);
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
