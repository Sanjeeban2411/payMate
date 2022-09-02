import React from 'react'
import Navbar from '../components/Navbar'
// import BarChart from './BarChart'
export default function Home() {
    return (
        <div>
            <Navbar/>
            <div className=" absolute w-full h-[60%] top-50% flex flex-col mt-28 font-Montserrat    text-black mx-auto">
                <div className=' mx-auto mt-40 font-bold md:text-3xl sm:text-2xl '>Get Your Payment Analysis Here</div>
                <div className=' mx-auto mt-6 md:text-5xl sm:text-3xl text-red-600 font-extrabold'>Enter Your Amount And Split Your Bills</div>
                <div className=' mx-auto mt-6 text-sky-600 font-extrabold md:text-3xl sm:text-2xl'>Fast and Easy Way</div>
                <div className='mx-auto p-4'>
                <button className='bg-[#33b249] text-3xl text-white hover:text-black m-4 p-2 rounded-md'><a href='/signup'>  Get Started</a></button>
                <button className='bg-[#E18A07] text-3xl text-white hover:text-black m-4  p-2 rounded-md'><a href='/signin'>SignIn</a></button>
                </div>
            </div>
        </div>
    )
}
