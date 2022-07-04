import React from 'react';
// import io from 'socket.io-client'
// import { SocketContext } from '../context/socket'

// const socket = io()
// const socket = io.connect("http://localhost:8000")

const Room = () => {

    // const socket = useContext(SocketContext); 

    // useEffect(() => {
    //     socket.on('message',()=>{

    //     })
    // }, []);
    // const sendMsg = () => {
    //     socket.emit("message")
    // }

    // useEffect(() => {
    //     // here we can use socket events and listeners
    //     return () => socket.disconnect(); //cleanup
    // }, [])


    return (
        <div>
            <input type="text" placeholder='. . . . . '/>
            <button>send</button>
        </div>
    );
}

export default Room;
