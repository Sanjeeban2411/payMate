import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import queryString from 'query-string'


export default function JoinRoom() {
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [data, setData] = useState('');

    const x = localStorage.getItem("jwt_token")


    // const value = queryString.parse(this.props.location.search);
    // const token = value.room;
    // console.log('token', token)
    const queries = queryString.parse(window.location.search)
    console.log('token', queries)
    if (queries.room && queries.pass) {
        axios({
            method: 'post',
            url: '/room/join',
            data:
            {
                "name": queries.room,
                "password": queries.pass.toString(),
            },
            headers: {
                'Authorization': `Bearer ${x}`
                // 'params': { name }
            }
        })
        .then((response) => {
                localStorage.setItem("url", window.location.href)
                console.log("URL", window.location.href)
                localStorage.setItem("room", queries.room)
                navigate(`/createdroom `)
                console.log(response)
                console.log(response.data.user.token)
            })
            .catch((error) => {
                console.log(error)
                if (error.response.status === 401) {
                    localStorage.setItem("url", window.location.href)
                    console.log("URL", window.location.href)
                    console.log("unauth")
                    navigate(`/signin`)
                  }
                // console.log("unauth")
            })
    }


    const create = (e) => {
        e.preventDefault();
        console.log(x)
        console.log(data)

        axios({
            method: 'post',
            url: '/room/join',
            data:
            // link.length > 0 ? {"join_link":link} : 
            {
                "name": name,
                "password": password.toString(),
            },
            headers: {
                'Authorization': `Bearer ${x}`
                // 'params': { name }
            }
        })
            .then((response) => {
                localStorage.setItem("room", name)
                navigate(`/createdroom `)
                console.log(response)
                console.log(response.data.user.token)
            })
            .catch(error => console.log(error))
    }
    console.log("link", link)

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
                <div className='flex flex-col mb-4'>
                    <label>Link</label>
                    <input className=' border relative bg-gray-100 p-2'
                        type="text"
                        name='link'
                        placeholder='Join Link'
                        onChange={(e) => { setLink(e.target.value) }}
                        value={link}
                    />
                </div>
                <button className='bg-[#E18A07] relative text-white font-extrabold text-xl w-full py-3 mt-8' onClick={create}  >Join Room</button>
                {/* <p className='flex items-center mt-2'><input className='mr-2' type="checkbox" />Remember Me</p> */}
            </form>
        </div>
    )
}
