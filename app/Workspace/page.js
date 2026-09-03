"use client";
import "./dashboard.css";

import { useEffect, useState } from "react";

export default function Dashboard() {

  // Defining States for Workspace Features
  const [workspacename, setworkspacename] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  
  const [roomname, setroomname] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState("");
  const [socket, setSocket] = useState(null);




  async function ShowWorkspaces() {

    const response = await fetch(
      "http://127.0.0.1:8000/showworkspaces/",
      {
        method: "GET",

        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access")}`
        }
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      setWorkspaces(data.data);
    }
  }


  

  useEffect(() => {

    ShowWorkspaces();

  }, []);


  

  async function CreateWorkSpace() {

    const response = await fetch(
      "http://127.0.0.1:8000/createworkspaces/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access")}`
        },

        body: JSON.stringify({
          name: workspacename
        })
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {

      setMessageStatus("Workspace created!");

      setworkspacename("");

      
      ShowWorkspaces();

    } else {

      setMessageStatus(
        "Workspace creation failed: " +
        JSON.stringify(data)
      );

    }
  }


 

  async function SelectWorkspace(workspace) {
    setSelectedWorkspace(workspace)
    
    setSelectedRoom(null);
    setMessages([]);
    await GetChatRooms(workspace.id);
  }


  

  function BackToWorkspaces() {

    
    if (socket) {
      socket.close();
    }

    
    setSelectedWorkspace(null);

   
    setRooms([]);

    
    setSelectedRoom(null);

    
    setMessages([]);

    
    setSocket(null);

  }


  
  async function CreateChatRoom() {

    if (!selectedWorkspace) {

      setMessageStatus(
        "Please select a workspace first."
      );

      return;
    }

    const response = await fetch(
      "http://127.0.0.1:8000/createroom/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access")}`
        },

        body: JSON.stringify({
          room_name: roomname,
          workspace: selectedWorkspace.id
        })
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {

      setMessageStatus("Chat room created!");

      setroomname("");

      // Refresh rooms
      GetChatRooms(selectedWorkspace.id);

    } else {

      setMessageStatus(
        "Room creation failed: " +
        JSON.stringify(data)
      );

    }
  }


  
  async function GetChatRooms(workspaceId) {

    const response = await fetch(
      `http://127.0.0.1:8000/showrooms/?workspace=${workspaceId}`,
      {
        method: "GET",

        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access")}`
        }
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {

      setRooms(data.data);

    }
  }


 
  function JoinRoom(room) {

    // Close previous WebSocket
    if (socket) {
      socket.close();
    }

    
    setSelectedRoom(room);

    
    setMessages([]);

    
    const newSocket = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${room.id}/`
    );


    

    newSocket.onopen = () => {

      console.log(
        "Connected to room:",
        room.id
      );

    };


    

    newSocket.onmessage = (event) => {

      const data = JSON.parse(event.data);

      console.log("Received:", data);

      if (Array.isArray(data.messages)) {

        setMessages(data.messages);

      }


      // New message
      else if (data.message) {

        setMessages((previousMessages) => [

          ...previousMessages,

          data.message

        ]);

      }

    };


    

    newSocket.onclose = (event) => {
  console.log("WebSocket CLOSED");
  console.log("Code:", event.code);
  console.log("Reason:", event.reason);
  console.log("Was clean:", event.wasClean);
};


    // Adding for identifying the immediate Disconnect

    newSocket.onerror = (error) => {

      console.log(
        "WebSocket error:",
        error
      );

    };


    // Save WebSocket
    setSocket(newSocket);

  }
  
  function SendMessage() {
    if (
      !socket ||
      socket.readyState !== WebSocket.OPEN
    ) {

      return;

    }
    if (!message.trim()) {
      return;

    }
    socket.send(
      JSON.stringify({
        message: message
      })
    );
    setMessage("");

  }


  

  
return (

  <div>
    {!selectedWorkspace && (

      <div className="dashboard">

        <h1>Dashboard</h1>



        <div className="section-card">

          <h2>Create Workspace</h2>

          <input
            type="text"
            placeholder="Workspace Name"
            value={workspacename}
            onChange={(e) =>
              setworkspacename(e.target.value)
            }
          />

          <button onClick={CreateWorkSpace}>
            Save
          </button>

        </div>


        

        <div className="section-card">

          <h2>Previous Workspaces</h2>

          {workspaces.length === 0 && (
            <p>
              No workspaces found.
            </p>
          )}


          <div className="workspace-list">

            {workspaces.map((workspace) => (

              <div
                key={workspace.id}
                className="workspace-card"
              >

                <button
                  onClick={() =>
                    SelectWorkspace(workspace)
                  }
                >
                  {workspace.name}
                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

    )}


    

    {selectedWorkspace && (

      <div className="dashboard workspace-screen">

        

        <button
          className="back-button"
          onClick={BackToWorkspaces}
        >
          ← Back to Workspaces
        </button>


       

        <h1>
          {selectedWorkspace.name}
        </h1>


        

        <div className="section-card">

          <h2>Create Chat Room</h2>

          <input
            type="text"
            placeholder="Room Name"
            value={roomname}
            onChange={(e) =>
              setroomname(e.target.value)
            }
          />

          <button
            onClick={CreateChatRoom}
          >
            Create Room
          </button>

        </div>


        

        <div className="section-card">

          <h2>Chat Rooms</h2>

          {rooms.length === 0 && (

            <p>
              No chat rooms in this workspace.
            </p>

          )}


          <div className="room-list">

            {rooms.map((room) => (

              <div
                key={room.id}
                className="room-card"
              >

                <button
                  onClick={() =>
                    JoinRoom(room)
                  }
                >
                  {room.room_name}
                </button>

              </div>

            ))}

          </div>

        </div>


       

        {selectedRoom && (

          <div className="chat-section">

            <h2>
              {selectedRoom.room_name}
            </h2>
            
            <div className="chat-box">
              <h3>Messages</h3>
              {messages.length === 0 && (

                <p>
                  No messages yet.
                </p>

              )}
              {messages.map((msg, index) => (

                <p
                  key={index}
                  className="message"
                >
                  {msg.content || msg}
                </p>

              ))}

            </div>


           
            <div className="chat-input">
              <input
                type="text"
                value={message}
                placeholder="Write message..."
                onChange={(e) =>
                  setMessage(e.target.value)
                }
              />

              <button
                onClick={SendMessage}
              >
                Send
              </button>

            </div>

          </div>

        )}

      </div>

    )}
    <p className="status-message">
      {messageStatus}
    </p>

  </div>

);
}
