async function getRooms() {

    const response = await fetch("http://127.0.0.1:8000/rooms/");

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
        return {("Joined:", room.name)};
    };

    websocket.onmessage = (event) => {

        const response = JSON.parse(event.data);

        return {(response)};
    };

    websocket.onclose = () => {
        console.log(room.name);
    };
}