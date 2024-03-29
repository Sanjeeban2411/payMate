import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import User from "./pages/User";
// import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import Rooms from "./pages/Rooms";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Details from "./pages/Details"
import CreatedRoom from "./pages/CreatedRoom";
import About from "./pages/About";
import Roomlogin from "./pages/Roomlogin";
import Report from "./pages/Report";
import EnterRoom from "./pages/EnterRoom";
import Signin from "./pages/Signin";
import LogUp from "./pages/LogUp";
import 'bootstrap/dist/css/bootstrap.min.css';
import Googlelogin from "./components/Googlelogin";
import AnalysisLog from "./pages/AnalysisLog";

// import io from 'socket.io-client'

// import { socket, SocketContext } from './context/socket';


function App() {
  // const socket = io("http://127.0.0.1:8000")
  // socket.on('connection',()=>{
  //   console.log("I'm connected")
  // })
  const [room, setRoom] = useState("");
  return (
    <>
    		{/* <SocketContext.Provider  value={socket}>  */}

      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/signup" element={<Signup />} /> */}
          <Route exact path="/signup" element={<LogUp/>} />
          {/* <Route exact path="/login" element={<Login />} /> */}
          <Route exact path="/user" element={<User />} />
          <Route exact path="/analysis" element={<Analysis />} />
          <Route exact path="/rooms" element={<Rooms room={room} setRoom={setRoom}/>} />
          <Route exact path="/createroom" element={<CreateRoom />} />
          <Route exact path="/createdroom" element={<CreatedRoom />} />
          <Route exact path="/joinroom" element={<JoinRoom />} />
          {/* <Route exact path="/roomlogin" element={<Roomlogin/>} /> */}
          <Route exact path="/details" elements={<Details/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/report" element={<Report/>} />
          <Route exact path="/roomlogin" element={<EnterRoom room={room}/>} />
          <Route exact path="/signin" element={<Signin/>} />
          <Route exact path="/analloghis" element={<AnalysisLog/>} />
          
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
      {/* </SocketContext.Provider> */}
      {/* <Home/> */}
    </>
  );
}

export default App;
