import React from 'react';
import io from 'socket.io-client'
const socket = io.connect("http://localhost:8000")

const Room = () => {
    const sendMsg = () => {
        // socket.emit("message")
    }
    return (
        <div>
            <input type="text" placeholder='. . . . . '/>
            <button onClick={sendMsg}>send</button>
        </div>
    );
}

export default Room;
