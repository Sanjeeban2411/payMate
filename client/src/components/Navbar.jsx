import React, { useState} from 'react'
import { FaUserAlt, FaMoneyBillWave } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { AiOutlineMenu } from 'react-icons/ai'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'


const Navbar = () => {

    
    const [nav, setNav] = useState(false)
    const [logo, setLogo] = useState(false)
    const handleNav = () => {
        setNav(!nav)
        setLogo(!logo)
    }
    return (
        <div>
            <div className='flex w-full justify-between items-center h-20 px-10 absolute z-10 font-Montserrat '>
                <div className='text-black' >
                    <h1 onClick={handleNav} className={logo ? ' hidden' : 'flex text-3xl font-black  '} >Paymate <div className='p-2 m-auto'><FaMoneyBillWave /></div></h1>
                </div>

                <ul className='hidden md:flex'>
                    <li className='p-7 font-bold text-black cursor-pointer'>Home</li>
                    <li className='p-7 font-bold text-black cursor-pointer'>Analysis</li>
                    <li className='p-7 font-bold text-black cursor-pointer'>Rooms</li>
                    <li className='p-7 font-bold text-black cursor-pointer'>About Us</li>
                </ul>
                <div className=' hidden md:flex md:pr-3 justify-between items-center  cursor-pointer'>
                    <button className='rounded-full p-3 bg-black text-white'><FaUserAlt /></button>
                    <h2 className='text-2xl font-bold m-2 text-red-500'>Login</h2>
                </div>
                <div className='hidden md:h-3'><hr/></div>
                <div className='md:hidden z-10 text-red-500' onClick={handleNav}>
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </div>
                <div onClick={handleNav} className={nav ? 'absolute left-0 top-0 w-full bg-gray-100/90 px-4 py-6 flex flex-col' : 'absolute left-[-100%]'}>
                    <ul>
                        <li className='text-3xl font-bold'>Paymate</li>
                        <li className='p-4 font-bold text-1xl border-b'>Home</li>
                        <li className='p-4 font-bold text-1xl border-b'>Analysis</li>
                        <li className='p-4 font-bold text-1xl border-b'>Rooms</li>
                        <li className='p-4 font-bold text-1xl border-b'>About Us</li>
                    </ul>
                    <div className='flex flex-col pb-4'>
                        <button className='p-3 border bg-gradient-to-r from-red-600 to-red-400 text-white rounded-md'>ACCOUNT</button>
                    </div>
                    <div className='flex justify-between my-3'>
                        <FaFacebook className='icon text-2xl cursor-pointer ' />
                        <FaInstagram className='icon text-2xl cursor-pointer ' />
                        <FaTwitter className='icon text-2xl cursor-pointer ' />
                        <FaYoutube className='icon text-2xl cursor-pointer ' />
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default Navbar