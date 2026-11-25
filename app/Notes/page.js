"use client";

import { useEffect, useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch Notes
  async function GetNotes() {
    const response = await fetch("https://workbook2-module2-3.onrender.com/notes/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });

    const data = await response.json();

    setNotes(data.data);
  }

  
  useEffect(() => {
    GetNotes();
  }, []);

  
  useEffect(() => {
    const socket = new WebSocket(
      "wss://workbook2-module2-3.onrender.com/ws/notes/"
    );

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "note_update") {
        const updatedNote = message.data;

        setNotes((currentNotes) =>
          currentNotes.map((note) =>
            note.id === updatedNote.id
              ? updatedNote
              : note
          )
        );
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  
  function SelectNote(note) {
    setSelectedNote(note);

    setTitle(note.title);
    setContent(note.content);
  }

 
  async function UpdateNote() {
    const response = await fetch(
      `https://workbook2-module2-3.onrender.com/notes/${selectedNote.id}/`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },

        body: JSON.stringify({
          title: title,
          content: content,
        }),
      }
    );

    if (response.ok) {
      setSelectedNote(null);
      GetNotes();
    }
  }

  
  if (selectedNote) {
    return (
      <div>
        <h2>Edit Note</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={UpdateNote}>
          Save
        </button>

        <button onClick={() => setSelectedNote(null)}>
          Back
        </button>
      </div>
    );
  }

  
  return (
    <div>
      <h2>Notes</h2>

      {notes.map((note) => (
        <div
          key={note.id}
          onClick={() => SelectNote(note)}
          style={{ cursor: "pointer" }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}