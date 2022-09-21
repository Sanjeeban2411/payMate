import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import queryString from 'query-string'
import CarouselComp from "../components/CarouselComp";
import CarouselIndicater from "../components/CarouselIndicater";


export default function JoinRoom() {
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [data, setData] = useState('');

    const x = localStorage.getItem("jwt_token")


    // const value = queryString.parse(this.props.location.search);
    // const token = value.room;
    // console.log('token', token)
    const queries = queryString.parse(window.location.search)
    console.log('token', queries)
    if (queries.room && queries.pass) {
        axios({
            method: 'post',
            url: '/room/join',
            data:
            {
                "name": queries.room,
                "password": queries.pass.toString(),
            },
            headers: {
                'Authorization': `Bearer ${x}`
                // 'params': { name }
            }
        })
            .then((response) => {
                // localStorage.setItem("url", window.location.href)
                // console.log("URL", window.location.href)
                localStorage.setItem("room", queries.room)
                navigate(`/createdroom `)
                console.log(response)
                console.log(response.data.user.token)
            })
            .catch((error) => {
                console.log(error)
                if (error.response.status === 401) {

                    // function setWithExpiry(key, value, ttl) {
                    const now = new Date()

                    // `item` is an object which contains the original value
                    // as well as the time when it's supposed to expire
                    const item = {
                        value: window.location.href,
                        expiry: now.getTime() + 5000,
                    }
                    const u = localStorage.setItem("url", JSON.stringify(item))
                    console.log("url/join", u)
                    // }

                    // localStorage.setItem("url", window.location.href)
                    console.log("URL", window.location.href)
                    console.log("unauth")
                    navigate(`/signin`)
                }
                // console.log("unauth")
            })
    }


    const create = (e) => {
        e.preventDefault();
        console.log(x)
        console.log(data)

        axios({
            method: 'post',
            url: '/room/join',
            data:
            // link.length > 0 ? {"join_link":link} : 
            {
                "name": name,
                "password": password.toString(),
            },
            headers: {
                'Authorization': `Bearer ${x}`
                // 'params': { name }
            }
        })
            .then((response) => {
                localStorage.setItem("room", name)
                navigate(`/createdroom `)
                console.log(response)
                console.log(response.data.user.token)
            })
            .catch(error => console.log(error))
    }
    console.log("link", link)

    return (
        <>
      <div className="bg-[#DEF6F9] h-screen px-11 py-8">
        <section className="flex flex-col md:flex-row h-full items-center rounded-2xl bg-white">
          <div className="h-screen hidden lg:w-1/2 md:block xl:w-[60%]">
            <CarouselComp />
           
            <div className="text-center text-[30px] font-extrabold">Split expenses with your <p>friends easily with our <spam className="text-[#02A9EA]">Rooms</spam></p></div>
            <CarouselIndicater />
          </div>
          <div 
            className=" w-full md:max-w-md lg:max-w-4xl md:mx-0 md:w-2/3 xl:w-[40%] h-[100%] px-2 lg:px-16 xl:px-28
          flex items-center justify-center rounded-r-2xl border-l-2 border-black"
          >
            <div className=" w-4/5 h-4/5 text-center border-2 border-black">
                <div className=' w-[90%] h-4/5 mx-auto my-5 border-2'>
              
              <h1 className="text-2xl font-bold my-auto">Join Room</h1>
              
              <form action="submit" className="mt-6 px-5">
                
                <div className="">
                  
                  <input
                    className="w-full px-4 py-1 rounded-lg bg-white  border focus:border-blue-500 focus:bg-white focus:outline-none placeholder-[#40B3BE]"
                    type="text"
                    name="room"
                    placeholder="Name"

                    onChange={(e) => { setName(e.target.value) }}
                    value={name}
                  />
                </div>
                <div className="mt-3">
                  <input
                    className="w-full px-4 py-1 rounded-lg bg-white  border focus:border-blue-500
                  focus:bg-white focus:outline-none placeholder-[#40B3BE]"
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
                  className="w-full block bg-[#2176AE] hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-1 mt-3"
                onClick={create}
                >
                  Join Room
                </button>
              
              </form>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
        // <div>
        //     <form action='submit' className='max-w-[400px] w-full mx-auto bg-white p-8'>
        //         <h2 className='text-4xl font-bold text-center py-8'>JOIN ROOM</h2>
        //         <div className='flex flex-col mb-4'>
        //             <label>Room</label>
        //             <input className=' border relative bg-gray-100 p-2'
        //                 type="text"
        //                 name='room'
        //                 placeholder='Name'
        //                 onChange={(e) => { setName(e.target.value) }}
        //                 value={name}
        //             />
        //         </div>
        //         <div className='flex flex-col mb-4'>
        //             <label>Password</label>
        //             <input className=' border relative bg-gray-100 p-2'
        //                 type="password"
        //                 name='password'
        //                 placeholder='Password'
        //                 onChange={(e) => { setPassword(e.target.value) }}
        //                 value={password}
        //             />
        //         </div>
        //         <div className='flex flex-col mb-4'>
        //             <label>Link</label>
        //             <input className=' border relative bg-gray-100 p-2'
        //                 type="text"
        //                 name='link'
        //                 placeholder='Join Link'
        //                 onChange={(e) => { setLink(e.target.value) }}
        //                 value={link}
        //             />
        //         </div>
        //         <button className='bg-[#E18A07] relative text-white font-extrabold text-xl w-full py-3 mt-8' onClick={create}  >Join Room</button>
        //         {/* <p className='flex items-center mt-2'><input className='mr-2' type="checkbox" />Remember Me</p> */}
        //     </form>
        // </div>
    )
}
