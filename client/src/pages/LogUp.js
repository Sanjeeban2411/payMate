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
        e.preventDefault();
        // setData({
        //     "name": name,
        //     "email": email,
        //     "password": password.toString()
        // })
        
        console.log(data)
        axios({
            method: 'post',
            url: '/signup',
            data: {"name": name,
                "email": email,
                "password": password.toString()}
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
    <div className="bg-[#DEF6F9] h-screen px-11 py-8">
     <section className='flex flex-col md:flex-row h-full items-center  rounded-2xl bg-white'>
        <div className='h-screen hidden lg:w-1/2 md:block xl:w-[60%]'>
        <div className="flex flex-col">
        <img
              className="w-[60%] h-[40%] object-center flex items-center justify-center mt-40 mx-auto"
              src="/assests/log-2.png"
              alt=""
            />

        </div>
        <div className="text-center text-[30px] font-extrabold">Split expenses with your <p>friends easily with our <spam className="text-[#02A9EA]">Rooms</spam></p></div>
            <img src="/assests/indicator.png" alt="" className="mx-auto mt-8"/>
            {/* <img className='w-full h-full object-cover' src="/assests/loginbg.jpg" alt=""/> */}
        </div>
        <div id="bg"
            className=" w-full md:max-w-md lg:max-w-4xl md:mx-0 md:w-2/3 xl:w-[40%] h-[100%] px-2 lg:px-16 xl:px-28
          flex items-center justify-center rounded-r-2xl">
            <div className='w-full h-100 text-center'>
            <div className="rounded-full flex items-center justify-center mt-7 bg-white mx-36  relative box-border min-w-[100px] min-h-[100px]">
                <img src="/assests/logo.png" alt="" className="ml-3"/>
              </div>
              <h1 className="text-3xl font-bold mt-6">Hello There!</h1>
              <h1 className="text-xl md:text-2xl font-bold leading-tight mt-4 text-white">
                Welcome to Paymate
              </h1>
                <form action='submit' className='mt-6'>
                    
                    <div className='mt-4'>
                        {/* <label className='block text-gray-700'>Username</label> */}
                        <input className=' w-full px-4 py-2 rounded-lg bg-white placeholder-[#40B3BE] mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
                            type="text"
                            name='username'
                            placeholder='Name'
                            onChange={(e) => 
                                { 
                                    setName(e.target.value)
                                    // setData({
                                    //     "name": e.target.value,
                                    //     "email": data.email,
                                    //     "password": data.password
                                    // });
                                 }}
                            value={name}
                        />
                    </div>
                    <div className='mt-4'>
                        {/* <label className='block text-gray-700'>E-mail</label> */}
                        <input className='w-full px-4 py-2 rounded-lg bg-white placeholder-[#40B3BE] mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
                            type="text"
                            name='email'
                            placeholder='Email'
                            onChange={(e) => { 
                                setEmail(e.target.value)
                                // setData({
                                //     "name": data.name,
                                //     "email": e.target.value,
                                //     "password": data.password
                                // });
                             }}
                        value={email}
                        />
                    </div>
                    <div className='mt-4'>
                        {/* <label className='block text-gray-700'>Password</label> */}
                        <input className='w-full px-4 py-2 rounded-lg bg-white placeholder-[#40B3BE] mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none'
                            type="password"
                            name='password'
                            placeholder='Password'
                            onChange={(e) => { 
                                setPassword(e.target.value)
                                // setData({
                                //     "name": data.name,
                                //     "email": data.email,
                                //     "password": e.target.value
                                // });
                             }}
                        value={password}
                        />
                    </div>
                    {/* <div className="text-right mt-2">
            <a href="/" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
          </div> */}
                    
                    <button className='w-full block bg-[#2176AE] hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-2 mt-6' onClick={handleSubmit}  >SignUp</button>
                 <button
                  className="w-full block bg-white hover:bg-blue-400 focus:bg-blue-400 text-black font-semibold rounded-lg
                px-4 py-2 mt-6"
                >
                  Sign Up with Google
                </button>
                </form>
                {/* <hr className='my-6 border-gray-300 w-full'/> */}
                <p className="mt-8">
              Already have an Account?
              <a
                href="/signin"
                className="text-blue-500 hover:text-blue-700 font-semibold pl-1"
              >
                Sign In
              </a>
             
            </p>

  
        <p className="text-sm text-gray-500 mt-12">&copy; 2022 PayMate - All Rights Reserved.</p>

            </div>
        </div>
    </section> 
    </div>
    </>
  )
}

export default LogUp
