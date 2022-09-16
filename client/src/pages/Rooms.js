import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Navbar from '../components/Navbar'

const Rooms = (props) => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
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
        console.log("res", response)
      })

      .catch((err) => {
        console.log(err)
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
      .catch(error => console.log(error))
  }

  const shareRoom = (event, val) => {
    const joinLink = `PayMate/joinroombysharedlink/Room=${val.name}&Password=${val.password}&`
    // console.log(joinLink)
    alert(joinLink)
  }

  return (
    <div>
      <Navbar />
      <div className=' absolute w-full h-[60%] top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-black px-10'>
        <div className='font-extrabold'>ROOMS</div>
        <div className='mt-12 flex flex-row bg-black text-white m-auto rounded-lg p-2 hover:bg-gray-400 hover:text-black'><div><a href="/createroom">Create a Room</a></div>
          {/* <div className='flex flex-col bg-gray-400'><div>Abode A306</div><div>5 Members</div> </div> */}
        </div>
        <div className='mt-8 bg-black text-white m-auto rounded-lg p-2 hover:bg-gray-400 hover:text-black'><a href="/joinroom">Join a Room</a></div>
        <div className='mt-12 mb-6 font-extrabold'>Your Rooms</div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:grid-cols-3'>
          {/* {data.map(card)} */}
          {data.map((val) => {
            return (
              <div className='flex flex-col bg-black  relative box-border items-center mx-auto rounded-full min-w-[200px] min-h-[200px] border-2 border-black '>
                <p className='relative text-center my-6 text-white font-extrabold'>{val.name}</p>
                {/* <p className='relative text-center my-3 text-white font-extrabold'></p> */}
                <button
                  className='bg-white hover:bg-slate-500 hover:text-white text-black mx-auto p-2 my-3 rounded-md'
                  onClick={event => enterRoom(event, val)}
                >
                  {/* () => {
                   props.setRoom(val)
                   navigate('/createdroom')
                   }
                 }> */}
                  {/* <a href = '/roomlogin'> */}
                  Enter
                  {/* </a> */}
                </button>

                <button 
                className='bg-white'
                onClick={event => shareRoom(event, val)}
                >
                  Share
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Rooms