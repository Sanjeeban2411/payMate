import React, { useState } from 'react'

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name)
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
                    type="text"
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
