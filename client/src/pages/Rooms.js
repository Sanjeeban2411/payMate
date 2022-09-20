import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import Navbar from '../components/Navbar'
import {BiShareAlt} from "react-icons/bi"

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
      <div className=' absolute w-full h-[60%] top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-black px-10'>
        <div className=''>ROOMS</div>
        <div className='mt-12  bg-black text-white m-auto rounded-lg p-2 hover:bg-gray-400 hover:text-black'><div><a href="/createroom">Create a Room</a></div></div>
          
        
        <div className='mt-8 bg-black text-white m-auto rounded-lg p-2 hover:bg-gray-400 hover:text-black'><a href="/joinroom">Join a Room</a></div>
        <div className='mt-12 mb-6 font-extrabold'>Your Rooms</div>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 sm:grid-cols-3'>
          {/* {data.map(card)} */}
          {data.map((val) => {
            return (
              <div className='flex flex-col   relative box-border items-center mx-auto rounded-xl min-w-[300px] min-h-[300px] border-2 border-black ' id="bg-card">
                <p className='relative text-center my-6 text-white font-extrabold'>{val.name}</p>
                <button
                  className='bg-white hover:bg-slate-500 hover:text-white text-black mx-auto p-2 my-3 rounded-md '
                  onClick={event => enterRoom(event, val)} id="enter-bg"
                >
                  Enter
                </button>



                <Popup
                  ref={ref}
                  trigger={
                    <button 
                className=' bg-transparent hover:bg-slate-500 hover:text-white text-black mx-auto p-2 my-3 rounded-md'
                onClick={event => shareRoom(event, val)} 
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
  )
}

export default Rooms