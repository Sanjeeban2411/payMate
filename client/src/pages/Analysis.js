import React from 'react'
import Navbar from '../components/Navbar'

const Analysis = () => {
  return (
    <div>
        <Navbar/>
        <div className=' absolute w-full h-[60%] top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-black px-10'>
            <div className='font-extrabold w-[300px] rounded-full h-[300px] text-center bg-gray-400'>
              <div className=' pt-32'>SPENDS IN JULY</div>
              </div>
        </div>
    </div>

  )
}

export default Analysis