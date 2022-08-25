import React from 'react'
import Navbar from '../components/Navbar'
import BarChart from './BarChart'

const Analysis = () => {
  return (
    <div>
        <Navbar/>
        <div className=' absolute w-full h-full top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-black px-10'>
            {/* <div className='font-extrabold w-[300px] rounded-full h-[300px] text-center bg-gray-400'> */}
              <div className='grid grid-cols-2 gap-8'>
                <div className='flex flex-col justify-between my-5'>
                  <div className='text-left rounded-md bg-black w-[220px] text-2xl text-white'><div className='text-center'>SPENDS IN JULY</div><div className='text-center'>₹4566</div></div>
                  <div className='ml-[300px] text-right rounded-md bg-black w-[200px] text-2xl text-white'><div className='text-center'>Transactions</div><div className='text-center'>↓</div></div>
                </div>
              <div className='flex flex-col'>
              <div className='mx-auto'><BarChart/></div>
              <div className='text-center font-extrabold'></div>
              </div>
              </div>
              <div className='my-4'>
              <form className='max-w-[1100px] mx-auto w-full rounded-md border-2 border-black p-8 mt-12'>
                <h2 className='text-4xl font-bold text-center py-6'>ENTER YOUR EXPENSES</h2>
                <div className='flex flex-row justify-between'>
                <div className='flex flex-col mb-4'>
                        <label className='text-center'>Amount</label>
                        <input className='relative border-2 border-black bg-gray-100 p-2 w-[300px]'
                            type="number"
                            placeholder='₹ Amount'
                        />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label className='text-center'>Category</label>
                        <input className='border-2 border-black relative bg-gray-100 p-2 w-[300px]'
                            type="text"
                            placeholder='Food'
                        />
                    </div>
                    </div>
                    <button className='flex justify-center items-center bg-black text-white mx-auto p-2 rounded-md my-2'>Add Spend</button>
                </form>
                </div>
              {/* </div> */}
        </div>
    </div>

  )
}

export default Analysis