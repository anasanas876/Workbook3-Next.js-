"use client";
import styles from "./Notes.module.css";

import { useState } from "react";

export default function CreateRoom({ id, token, onRoomCreated }) {
    const [roomName, setRoomName] = useState("");

    async function createChatRoom() {
        if (!roomName.trim()) {
            alert("Please enter a room name");
            return;
        }

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/createroom/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        room_name: roomName,
                        workspace: id
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Room created successfully");
                setRoomName("");

                if (onRoomCreated) {
                    onRoomCreated();
                }
            } else {
                alert(JSON.stringify(data));
            }

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    }
return (
  <div className={styles.container}>
    <input
      type="text"
      placeholder="Enter room name"
      value={roomName}
      onChange={(e) => setRoomName(e.target.value)}
      className={styles.input}
    />

    <button className={styles.button} onClick={createChatRoom}>
      Create Room
    </button>
  </div>
);
}