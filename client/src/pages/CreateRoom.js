import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const CreateRoom = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [data, setData] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        const x = localStorage.getItem("jwt_token")
        console.log(x)
        setData({
            "name": name,
            "password": password.toString()
        })
        console.log(data)
        axios({
            method: 'post',
            url: '/room/create',
            data: data,
            headers: {
                'Authorization': `Bearer ${x}`,
                'params': {name}
            }
        })
        .then((response) => {
            // localStorage.setItem("jwt_token",response.data.user.token)
            localStorage.setItem("room",name)
            navigate(`/createdroom`)
            console.log(response)
            console.log(response.data.user.token)
        })
        .catch(error => console.log(error))
    }


    return (
        <form action='submit' className='max-w-[400px] w-full mx-auto bg-white p-8'>
                    <h2 className='text-4xl font-bold text-center py-8'>Create Room</h2>
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
                    <button className='bg-[#E18A07] relative text-white font-extrabold text-xl w-full py-3 mt-8' onClick={handleSubmit}  >create room</button>
                    {/* <p className='flex items-center mt-2'><input className='mr-2' type="checkbox" />Remember Me</p> */}
                </form>
    );
}

export default CreateRoom;
