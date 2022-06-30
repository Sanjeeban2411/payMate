import React, { useState } from 'react'
import axios from 'axios'
export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault()
        setData( {
            "name": name,
            "email": email,
            "password": password.toString
        })
        console.log(data)
        axios({
            method: 'post',
            url: '/signup',
            data: data
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    // console.log(email)
    return (
        <div className='absolute mt-28'>
            <form action='submit' className='flex flex-col'>
                <input
                    type="text"
                    name='username'
                    placeholder='Name'
                    onChange={(e) => { setName(e.target.value) }}
                    value={name}
                />
                <input
                    type="text"
                    name='email'
                    placeholder='Email'
                    onChange={(e) => { setEmail(e.target.value) }}
                    value={email}
                />
                <input
                    type="password"
                    name='password'
                    placeholder='Password'
                    onChange={(e) => { setPassword(e.target.value) }}
                    value={password}
                />
                <button onClick={handleSubmit}>SignUp</button>
            </form>
        </div>
    )
}
