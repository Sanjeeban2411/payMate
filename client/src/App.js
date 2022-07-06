import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import User from "./pages/User";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import Rooms from "./pages/Rooms";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Details from "./pages/Details"

// import io from 'socket.io-client'

// import { socket, SocketContext } from './context/socket';


function App() {
  // const socket = io("http://127.0.0.1:8000")
  // socket.on('connection',()=>{
  //   console.log("I'm connected")
  // })
  return (
    <>
    		{/* <SocketContext.Provider  value={socket}>  */}

      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/analysis" element={<Analysis />} />
          <Route exact path="/rooms" element={<Rooms />} />
          <Route exact path="/createroom" element={<CreateRoom />} />
          <Route exact path="/joinroom" element={<JoinRoom />} />
          <Route exact path="/details" elements={<Details/>} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
      {/* </SocketContext.Provider> */}
      {/* <Home/> */}
    </>
  );
}

export default App;
