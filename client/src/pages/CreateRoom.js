import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const CreateRoom = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [data, setData] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const x = localStorage.getItem("jwt_token")
        console.log(x)
        // setData({
        //     "name": name,
        //     "password": password.toString()
        // })
        console.log(data)
        axios({
            method: 'post',
            url: 'https://paymate-back.onrender.com/room/create',
            data: {"name": name,
                "password": password.toString()},
            headers: {
                'Authorization': `Bearer ${x}`,
                'params': {name}
            }
        })
        .then((response) => {
            // localStorage.setItem("jwt_token",response.data.user.token)
            localStorage.setItem("room",name)
            navigate(`/createdroom`)
            console.log(response)
            console.log(response.data.user.token)
        })
        .catch((error) => {
            console.log(error)
            if (error.response.status === 401) {
                console.log("unauth")
                navigate(`/signin`)
              }
            // console.log("unauth")
        })
    }


    return (
        <>
              <div className="bg-[#DEF6F9] h-screen px-11 py-8">
        <section className="flex flex-col md:flex-row h-full items-center rounded-2xl bg-white">
          <div className="h-screen hidden lg:w-3/4 md:block xl:w-[60%]">
          <img
          className="w-[80%] h-[60%] object-center flex items-center justify-center mt-16 mx-auto"
          src="/assests/room-login.png"
          alt="Second slide"
        />
            {/* <CarouselComp /> */}
           
            <div className="text-center text-[30px] font-extrabold w-1/2 mx-auto">Create rooms and add all your mates</div>
            {/* <CarouselIndicater /> */}
          </div>
          <div 
            className=" w-full md:max-w-md lg:max-w-4xl md:mx-0 md:w-[100%] xl:w-[50%] h-[100%] px-2 lg:px-16 xl:px-28
          flex items-center justify-center rounded-r-2xl md:border-l-2 border-black"
          >
            <div className=" w-[90%] h-[90%] text-center border-[3px] border-[#2176AE]  rounded-[20px]">
                <div className=' w-[90%] h-[55%] mx-auto my-32 '>
              
              <h1 className="text-3xl font-bold my-auto">Create Room</h1>
              
              <form action="submit" className="mt-10 px-2 ">
                
                <div className="">
                  
                  <input
                    className="w-full px-4 py-2 rounded-[10px] bg-white border-2 border-[#2176AE] placeholder-[#2176AE] placeholder:text-center"
                    type="text"
                    name="room"
                    placeholder="Name"

                    onChange={(e) => { setName(e.target.value) }}
                    value={name}
                  />
                </div>
                <div className="my-4">
                  <input
                    className="w-full px-4 py-2 rounded-[10px] bg-white  border-2 border-[#2176AE] placeholder-[#2176AE] placeholder:text-center"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                </div>
              
                <button
                  className="xl:w-1/3 lg:w-[40%] block font-extrabold bg-[#2176AE] hover:bg-blue-400 focus:bg-blue-400 text-white  rounded-lg
                px-4 py-2 mt-5 mx-auto"
                onClick={handleSubmit}
                >
                  Create
                </button>
              
              </form>
              </div>

            </div>
          </div>
        </section>
      </div>
        </>
    );
}

export default CreateRoom;
