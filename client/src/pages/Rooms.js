import React from 'react'
import Navbar from '../components/Navbar'

const Rooms = () => {
  return (
    <div>
        <Navbar/>
        <div className=' absolute w-full h-[60%] top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-black px-10'>
            <div className='font-extrabold'>ROOMS</div>
            <div className='mt-12 flex flex-row'><div>Create a Room<span className='text-3xl'>&#8594;</span></div>
            {/* <div className='flex flex-col bg-gray-400'><div>Abode A306</div><div>5 Members</div> </div> */}
            </div>
            <div className='mt-8'>Join a Room<span className='text-3xl'>&#8594;</span></div>
            
        </div>
    </div>
  )
}

export default Rooms