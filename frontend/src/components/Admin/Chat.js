import React, { useState, useEffect } from "react";
import "./Admin.css";
import socketClient from "socket.io-client";
const SERVER = "http://localhost:5000";

const Chat = () => {
  var socket = socketClient(SERVER);
  socket.on("connection", () => {
    console.log("I am connected with backend");
  });
  const [message, setMessage] = useState();
  const [msgData, setMsgData] = useState([]);
  const [hint, setHint] = useState();

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("new-msg", { username: "admin", message: message });
    setMessage("");
    window.location.reload(false);
  };

  socket.on("message", ({ username, message }) => {
    console.log(`msg here: ${message}`);
    setMsgData([username, message]);
  });

  const callMsg = async () => {
    const res = await fetch("/list", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setMsgData(data.reverse().map((m) => [m.username, m.message]));
  };

  useEffect(() => {
    callMsg();
  }, []);

  console.log(msgData);
  return (
    <div>
      <h1 className="admin-dash-heading">Chat</h1>

      <ul>
        {msgData.map((m) => {
          return (
            <div
              className={
                m[0] === "admin" ? "chat-sendto-left" : "chat-sendto-right"
              }
            >
              <li style={{ fontWeight: "bold" }}>{m[0]}</li>
              <li>{m[1]}</li>
              <br />
            </div>
          );
        })}
      </ul>
      <form onSubmit={sendMessage}>
        <label htmlFor="message">Type Message</label>
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>

        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
