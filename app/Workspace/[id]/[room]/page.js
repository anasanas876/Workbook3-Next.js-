"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


import Notes from "../../../../components/Notes";

import styles from "./[room].module.css";

export default function RoomPage() {
  const { id, room } = useParams(); // id = workspace id, room = room id
  const [roomData, setRoomData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!room) return;

    async function loadRoom() {
      try {
        setLoading(true);
        
        const res = await fetch(
         `https://workbook2-module2-3.onrender.com/showmessages/${room}/`
        );
        if (!res.ok) throw new Error("Failed to load room");

        const data = await res.json();
        
        setRoomData(data.room);
        setMessages(data.messages);
        setNotes(data.notes)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadRoom();
  }, [id, room]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
  <div className={styles.page}>
    <h1 className={styles.title}>{roomData?.name}</h1>

    <div className={styles.layout}>
      <section className={styles.panel}>
        <h2 className={styles.panelTitle}>Messages</h2>
        <div className={styles.messageList}>
          {messages.length === 0 ? (
            <p className={styles.empty}>No messages yet.</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={styles.message}>
                <span className={styles.sender}>{msg.sender}</span>
                {msg.content}
              </div>
            ))
          )}
        </div>
      </section>

      <aside className={styles.panel}>
        <Notes key={room} roomId={room} initialNotes={notes} />
      </aside>
    </div>
  </div>
);
}