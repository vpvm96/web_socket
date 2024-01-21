import { useEffect, useState } from "react";
// 소켓
import io from "socket.io-client";
// 컴포넌트
import Container from "@/components/container";

interface IMessage {
  text: string;
  isOwnMessage: boolean;
}

const Chat = () => {
  const socket = io("http://localhost:3001");

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  console.log(messages);

  const [room, setRoom] = useState<string>("");

  const sendMessage = () => {
    if (newMessage) {
      const newMsg = { text: newMessage, isOwnMessage: true };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      const newMsg = {
        text: data.message,
        isOwnMessage: data.userId === socket.id,
      };

      setMessages((prevMessages) => [...prevMessages, newMsg]);
    });
  }, [socket]);

  return (
    <Container>
      <div className="flex p-4 shadow-md justify-between items-center">
        <h1 className="text-lg font-bold">채팅</h1>

        <div className="flex">
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="border-2 border-gray-200 rounded p-2 mr-2 flex-grow"
            placeholder="방 이름을 입력하세요."
          />
          <button onClick={joinRoom} className="bg-blue-500 text-white rounded p-2 px-4 text-md">
            방 입장
          </button>
        </div>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded my-2 ${message.isOwnMessage ? "bg-blue-100 ml-auto" : "bg-red-100 mr-auto"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex p-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          className="border-2 border-gray-200 rounded p-2 mr-2 flex-grow"
          placeholder="메세지를 입력하세요."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white rounded p-2 px-4 text-md">
          전송
        </button>
      </div>
    </Container>
  );
};

export default Chat;
