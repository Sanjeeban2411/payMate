import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import User from "./pages/User";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Analysis from "./pages/Analysis";
import Rooms from "./pages/Rooms";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/room" element={<Room />} />
          <Route exact path="/analysis" element={<Analysis />} />
          <Route exact path="/rooms" element={<Rooms />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <Home/> */}
    </>
  );
}

export default App;
