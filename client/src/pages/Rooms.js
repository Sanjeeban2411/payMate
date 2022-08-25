import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const Rooms = () => {
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
        setData(response.data)
        // console.log(response)
      })

      .catch((err) => {
        console.log(err)
      })

  }, []);
  return (
    <div>
      <Navbar />
      <div className=' absolute w-full h-[60%] top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-black px-10'>
        <div className='font-extrabold'>ROOMS</div>
        <div className='mt-12 flex flex-row bg-black text-white m-auto rounded-lg p-2 hover:bg-gray-400 hover:text-black'><div><a href="/createroom">Create a Room</a></div>
          {/* <div className='flex flex-col bg-gray-400'><div>Abode A306</div><div>5 Members</div> </div> */}
        </div>
        <div className='mt-8 bg-black text-white m-auto rounded-lg p-2 hover:bg-gray-400 hover:text-black'><a href="/joinroom">Join a Room</a></div>
        <div className='mt-12 font-extrabold'>Your Rooms</div>
        <div className='grid grid-cols-3 gap-4'>
          {/* {data.map(card)} */}
          {data.map((val)=>{
            return(
              <div className='flex flex-col border-2 border-black'>
        <div className='p-4 text-center'>{val}</div>
        <button className='bg-black text-white mx-auto p-2 my-3 rounded-md'><a href='/roomlogin'>Enter</a></button>
       </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Rooms