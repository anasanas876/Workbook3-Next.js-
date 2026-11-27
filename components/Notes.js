"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Notes.module.css";

export default function Notes({ roomId, initialNotes = [] }) {
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    let ws;
    let retry;
    let cancelled = false;

    const connect = () => {
      const token = localStorage.getItem("access");
      // Change to your original WebSocket URL
      ws = new WebSocket(
        `wss://workbook2-module2-3.onrender.com/ws/rooms/${roomId}/notes/?token=${token}`
      );
      wsRef.current = ws;

      ws.onopen = () => setConnected(true);

      ws.onmessage = (e) => {
  console.log("RAW WS DATA:", e.data);
  const parsed = JSON.parse(e.data);
  console.log("PARSED:", parsed);
  const { event, note } = parsed;
  if (event === "created") {
    setNotes((prev) =>
      prev.some((n) => n.id === note.id) ? prev : [...prev, note]
    );
  } else if (event === "updated") {
    setNotes((prev) => prev.map((n) => (n.id === note.id ? note : n)));
  }
};


      ws.onclose = () => {
        setConnected(false);
        if (!cancelled) retry = setTimeout(connect, 1000);
      };
    };

    connect();

    return () => {
      cancelled = true;
      clearTimeout(retry);
      ws?.close();
    };
  }, [roomId]);

  const send = (payload) => {
    const ws = wsRef.current;
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload));
      return true;
    }
    return false;
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    if (send({ action: "create", content: newNote })) setNewNote("");
  };

  const saveEdit = () => {
    if (!editText.trim()) return;
    if (send({ action: "edit", id: editingId, content: editText })) {
      setEditingId(null);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Notes</h2>
        {!connected && <span className={styles.status}>Connecting...</span>}
      </div>

      <div className={styles.list}>
        {notes.map((note) => (
          <div key={note.id} className={styles.note}>
            {editingId === note.id ? (
              <>
                <textarea
                  className={styles.textarea}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className={styles.actions}>
                  <button
                    className={styles.button}
                    onClick={saveEdit}
                    disabled={!connected}
                  >
                    Save
                  </button>
                  <button
                    className={styles.buttonSecondary}
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className={styles.noteText}>{note.content}</p>
                <div className={styles.actions}>
                  <button
                    className={styles.buttonSecondary}
                    onClick={() => {
                      setEditingId(note.id);
                      setEditText(note.content);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className={styles.composer}>
        <textarea
          className={styles.textarea}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a note..."
        />
        <button
          className={styles.button}
          onClick={addNote}
          disabled={!connected}
        >
          Add Note
        </button>
      </div>
    </div>
  );
}