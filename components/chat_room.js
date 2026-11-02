import { useEffect, useState } from "react";
const[rooms,setrooms]=useState(false)
async function getRooms() {



    const response = await fetch("http://127.0.0.1:8000/rooms/");
    setrooms(true)

    const rooms = await response.json();

    rooms.forEach(room => {
        return room.name

        
    });
}


function JoinRoom(room) {

    const websocket = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/${room.id}/`
    );

    websocket.onopen = () => {
        return <div style={{color:"green"}}>
            `joined${room.name}`
        </div>
    };
const [messages, setMessages] = useState([]);

useEffect(() => {
    async function GetMessages() {
        const response = await fetch(
            `http://127.0.0.1:8000/messages/${room.id}`
        );

        const data = await response.json();

        setMessages(data);
    }

    GetMessages();
}, [room.id]);
{messages.map((message) => (
    <div key={message.id} style={{ color: "yellow" }}>
        {message.text} - {message.author}
    </div>
))}}




   
    


    websocket.onmessage = (event) => {

        const response = JSON.parse(event.data);

        return {(response)};
    };

    websocket.onclose = () => {
        console.log(room.name);
    };
}