import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import Navbar from '../components/Navbar'
import {BiShareAlt} from "react-icons/bi"
import {FaUser} from "react-icons/fa"

const Rooms = (props) => {

  const ref = useRef();
  // const openTooltip = () => ref.current.open();
  const closeTooltip = () => ref.current.close();
  // const toggleTooltip = () => ref.current.toggle();

  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [user, setUser] = useState();
  console.log("userNames", data)
  const x = localStorage.getItem("jwt_token")
  useEffect(() => {
    axios({
      method: 'get',
      url: `/showrooms`,
      headers: {
        'Authorization': `Bearer ${x}`
      }
    })
      .then((response) => {
        setData(response.data.r)
        setUser(response.data.user)
        console.log("res", response)
      })

      .catch((err) => {
        console.log(err)
        if (err.response.status === 401) {
          console.log("unauth")
          navigate(`/signin`)
        }
      })

  }, []);

  console.log("xxx", props.room)

  const enterRoom = (event, value) => {
    // props.setRoom()
    console.log("v", value)
    const x = localStorage.getItem("jwt_token")

    axios({
      method: 'post',
      url: '/room/join',
      data: {
        "name": value.name,
        "password": value.password
      },
      headers: {
        'Authorization': `Bearer ${x}`,
        // 'params': { name }
      }
    })
      .then((response) => {
        localStorage.setItem("room", value.name)
        navigate(`/createdroom `)
        console.log(response)
        console.log(response.data.user.token)
      })
      .catch(error => {
        console.log(error)
        if (error.response.status === 401) {
          console.log("unauth")
          navigate(`/signin`)
        }
      })
  }


  return (
    <div>
      <Navbar />
      <div className=' absolute w-full h-[60%] top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-black'>
      <div id="rooms-bg">
        <div className=' flex flex-row'>
          <div className=' w-1/2 font-extrabold ml-10'>
          Rooms enable you to <span className='text-[#02A9EA]'>divide</span> and keep <span className='text-[#02A9EA]'>track</span> of everything you have spent with your <span className='text-[#02A9EA]'>roomates</span>
          </div>
          <div className='  h-[30vh]'>
            <div className=' mx-32 '>
        <div className=' text-2xl  mt-6 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300'><div><a href="/createroom" className=' bg-black text-white  rounded-lg p-3 px-33 hover:bg-gray-400 hover:text-black no-underline '>Create a Room</a></div></div>
        <div className='text-2xl mt-12 mx-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300'><a href="/joinroom" className=' bg-black text-white  rounded-lg p-3 px-3 hover:bg-gray-400 hover:text-black no-underline'>Join a Room</a></div>
        </div>
        </div>
        </div>
        
        <div className='my-12 font-extrabold text-center' >Your Rooms</div>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 sm:grid-cols-3'>
          {data.map((val) => {
            return (
              <div className='flex flex-col   relative box-border items-center mx-auto rounded-xl min-w-[300px] min-h-[300px] border-2 border-black transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-500' id="bg-card">
                <p className='relative text-center my-6 text-white font-extrabold'>{val.name}</p>
                <div className=' flex flex-row'>
                <div className='p-1'><FaUser/></div> 
                <div className='p-1'>{val.users.length}</div>
                </div>
                <button
                  className='bg-white hover:bg-slate-500 hover:text-white text-black mx-auto p-2 my-3 rounded-md transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300'
                  onClick={event => enterRoom(event, val)} id="enter-bg"
                >
                  Enter
                </button>



                <Popup
                  ref={ref}
                  trigger={
                    <button 
                className=' bg-transparent hover:bg-slate-500 hover:text-white text-black mx-auto p-2 my-3 rounded-md'
                // onClick={event => shareRoom(event, val)} 
                >
                  <div className='flex flex-row'><h3>Share</h3><h3 className='p-1 '><BiShareAlt/></h3></div> 
                </button>
                  }
                  modal
                  closeOnDocumentClick
                  contentStyle={{ width: "70vw", height: "100px", position: "relative", margin: "auto" }}
                >
                  <div className=' font-bold'>
                    {`http://192.168.1.5:3000/joinroom?user=${user._id}&room=${val.name}&pass=${val.password}`}
                    <br />
                    <button
                      className='bg-white hover:bg-slate-500 hover:text-white text-black mx-auto p-2 my-3 rounded-md ' id="bg-card"
                      onClick={() => {
                        navigator.clipboard.writeText(`http://192.168.1.5:3000/joinroom?user=${user._id}&room=${val.name}&pass=${val.password}`)
                        closeTooltip()
                      }}
                    >
                      copy
                    </button>
                  </div>
                </Popup>


              </div>
            )
          })}
        </div>
        </div>
      </div>
    </div>
  )
}

export default Rooms