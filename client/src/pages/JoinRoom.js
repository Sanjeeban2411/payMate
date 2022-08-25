import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function JoinRoom() {
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [data, setData] = useState('');

    const create = (e) => {
        e.preventDefault()
        const x = localStorage.getItem("jwt_token")
        console.log(x)
        setData({
            "name": name,
            "password": password.toString()
        })
        console.log(data)

        // useEffect(() => {
            axios({
                method: 'post',
                url: '/room/join',
                data: data,
                headers: {
                    'Authorization': `Bearer ${x}`,
                    'params': {name}
                }
            })
            .then((response) => {
                localStorage.setItem("room",name)
                navigate(`/createdroom `)
                console.log(response)
                console.log(response.data.user.token)
            })
            .catch(error => console.log(error))
        // }, []);
    }

  return (
    <div>
        <form action='submit' className='max-w-[400px] w-full mx-auto bg-white p-8'>
                    <h2 className='text-4xl font-bold text-center py-8'>JOIN ROOM</h2>
                    <div className='flex flex-col mb-4'>
                        <label>Room</label>
                        <input className=' border relative bg-gray-100 p-2'
                            type="text"
                            name='room'
                            placeholder='Name'
                            onChange={(e) => { setName(e.target.value) }}
                            value={name}
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
                    <button className='bg-[#E18A07] relative text-white font-extrabold text-xl w-full py-3 mt-8' onClick={create}  >Join Room</button>
                    {/* <p className='flex items-center mt-2'><input className='mr-2' type="checkbox" />Remember Me</p> */}
                </form>
    </div>
  )
}
