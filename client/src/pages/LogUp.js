import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const LogUp = () => {

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


  return (
    <>
     <section className='flex flex-col md:flex-row h-screen items-center'>
        <div className='h-screen hidden lg:block md:w-1/2 xl:w-2/3'>
            <img className='w-full h-full object-cover' src="/assests/loginbg.jpg" alt=""/>
        </div>
        <div className='bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center'>
            <div className='w-full h-100'>
                <h1 className='text-3xl font-bold'>PAYMATE</h1>
                <h1 className='text-xl md:text-2xl font-bold leading-tight mt-12'>Create Your Account</h1>

                <form action='submit' className='mt-6'>
                    
                    <div className='mt-4'>
                        <label className='block text-gray-700'>Username</label>
                        <input className=' w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
                            type="text"
                            name='username'
                            placeholder='Name'
                            onChange={(e) => { setName(e.target.value) }}
                            value={name}
                        />
                    </div>
                    <div className='mt-4'>
                        <label className='block text-gray-700'>E-mail</label>
                        <input className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
                            type="text"
                            name='email'
                            placeholder='Email'
                            onChange={(e) => { setEmail(e.target.value) }}
                        value={email}
                        />
                    </div>
                    <div className='mt-4'>
                        <label className='block text-gray-700'>Password</label>
                        <input className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none'
                            type="password"
                            name='password'
                            placeholder='Password'
                            onChange={(e) => { setPassword(e.target.value) }}
                        value={password}
                        />
                    </div>
                    {/* <div className="text-right mt-2">
            <a href="/" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
          </div> */}
                    
                    <button className='w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6' onClick={handleSubmit}  >SignUp</button>
                </form>
                <hr className='my-6 border-gray-300 w-full'/>
                
  
        <p className="text-sm text-gray-500 mt-12">&copy; 2022 PayMate - All Rights Reserved.</p>

            </div>
        </div>
    </section> 
    </>
  )
}

export default LogUp
