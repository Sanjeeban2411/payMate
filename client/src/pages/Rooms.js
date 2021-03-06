import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const Rooms = () => {
  const [data, setData] = useState("");
  const x = localStorage.getItem("jwt_token")
  useEffect(() => {
    axios({
      method: 'get',
      url: `/showrooms`,
      headers: {
        'Authorization': `Bearer ${x}`
      }
    })
    .then((response)=>{
      setData(response)
      console.log(response)
    })
    .catch((err)=>{
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

      </div>
    </div>
  )
}

export default Rooms