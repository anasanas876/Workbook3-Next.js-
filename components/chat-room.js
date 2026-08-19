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

async function ShowNotes(){
    const get_notes=await fetch("http;127.0.0.1:8000/shownotes/")
    const response=await get_rooms.json()

}

function ShowUI(){
    notes.map(note=>(
        <div>
        <h3>{note.title}</h3>
        
        <p>{note.content}</p>
        
        <button onClick={()=>editNote(note)}>Edit</button>
        
        </div>
         )
         )
}

function EditContent= (event)=>{
    return(
        {ShowUI}
    )

}

// Fetch the message with correct id
function fetchMessages(){
    const id=showNotes()
    const response=await response.json()
    const data=response["id"]
    fetch("http://127.0.0.1:8000/notes/update/", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: data.id,
        content: newContent
    })
});

}