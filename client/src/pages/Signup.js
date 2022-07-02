import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault()
        setData({
            "name": name,
            "email": email,
            "password": password.toString()
        })
        
        console.log(data)
        axios({
            method: 'post',
            url: '/signup',
            data: data
        })
            .then(function (response) {
                localStorage.setItem("jwt_token",response.data.user.token)
                console.log(response);
                navigate(`/user`)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    // console.log(email)
    return (
        <div className='relative w-full h-screen bg-zinc-900/90'>
            <img className='absolute w-full h-full object-cover mix-blend-overlay' src='/assests/bg-login.jpg' alt="try" />
            <div className='flex justify-center items-center h-full '>
                <form action='submit' className='max-w-[400px] w-full mx-auto bg-white p-8'>
                    <h2 className='text-4xl font-bold text-center py-8'>SIGNUP</h2>
                    <div className='flex flex-col mb-4'>
                        <label>Username</label>
                        <input className=' border relative bg-gray-100 p-2'
                            type="text"
                            name='username'
                            placeholder='Name'
                            onChange={(e) => { setName(e.target.value) }}
                            value={name}
                        />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label>E-mail</label>
                    <input className=' border relative bg-gray-100 p-2'
                        type="text"
                        name='email'
                        placeholder='Email'
                        onChange={(e) => { setEmail(e.target.value) }}
                        value={email}
                    />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label>Password</label>
                    <input className=' border relative bg-gray-100 p-2'
                        type="password"
                        name='password'
                        placeholder='Password'
                        onChange={(e) => { setPassword(e.target.value) }}
                        value={password}
                    />
                    </div>
                    <button className='bg-[#E18A07] relative text-white font-extrabold text-xl w-full py-3 mt-8' onClick={handleSubmit}>SignUp</button>
                </form>
            </div>
        </div>
    )
}
