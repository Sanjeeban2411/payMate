import React, { useEffect, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { Carousel } from 'react-responsive-carousel';
import axios from "axios";
import CarouselComp from "../components/CarouselComp";
import CarouselIndicater from "../components/CarouselIndicater";
import jwt_decode from 'jwt-decode'



const Signin = () => {

  const google=window.google

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState({});

  console.log("out", data);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("in", data);
    console.log("url", localStorage.getItem("url"));
    

    axios({
      method: "post",
      url: "/login",
      //   data: data,
      data: { email: email, password: password.toString() },
    })
      .then((response) => {
        localStorage.setItem("jwt_token", response.data.user.token);
        // localStorage.removeItem("url")

        let url = localStorage.getItem("url")
    
        if (!url) {
          navigate("/user");
        }
        const item = JSON.parse(url)
        const now = new Date()
        
        if (now.getTime() > item.expiry) {
         
          localStorage.removeItem("url")
          
          navigate("/user");
        }
      
        const i = url.indexOf("/joinroom")
        url = url.slice(i)
        console.log("signinURL", url)
        navigate(url);
     
        console.log(response);
        console.log(response.data.user.token);
      })
      .catch((error) => console.log(error));
    



    
    }
    const[ user, setUser] = useState({})

    function handleCallbackResponse(response){
        console.log("jwt:"+response.credential)
        var userobj=jwt_decode(response.credential)
        console.log("data:",userobj)
        setUser(userobj)
        document.getElementById("signInDiv").hidden = true
    }

    useEffect(()=>{
        google.accounts.id.initialize({
            client_id: "173408333561-klfrlhhu2reqfmutuslfvh6g3d3i1p7f.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large",width:400, shape: "pill" ,text: "signin_with"}
            )
            google.accounts.id.prompt()
    },[]);


    if(user.email_verified=true){
      axios({
        method: "post",
        url: "/login",
        //   data: data,
        data: { email: user.email, password: "cccc" },
      })
        .then((response) => {
          localStorage.setItem("jwt_token", response.data.user.token);
          
  
          let url = localStorage.getItem("url")
   
          if (!url) {
            navigate("/user");
          }
          const item = JSON.parse(url)
          const now = new Date()
         
          if (now.getTime() > item.expiry) {
            
            localStorage.removeItem("url")
            
            navigate("/user");
          }
         
          const i = url.indexOf("/joinroom")
          url = url.slice(i)
          console.log("signinURL", url)
          navigate(url);
     
          console.log(response);
          console.log(response.data.user.token);
        })
        .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="bg-[#DEF6F9] h-screen px-11 py-8">
        <section className="flex flex-col md:flex-row h-full items-center rounded-2xl bg-white">
          <div className="h-screen hidden lg:w-1/2 md:block xl:w-[60%]">
            <CarouselComp />
          
            <div className="text-center text-[30px] font-extrabold">Split expenses with your <p>friends easily with our <spam className="text-[#02A9EA]">Rooms</spam></p></div>
            
            <CarouselIndicater />
          </div>
          <div id="bg"
            className=" w-full md:max-w-md lg:max-w-4xl md:mx-0 md:w-2/3 xl:w-[40%] h-[100%] px-2 lg:px-16 xl:px-28
          flex items-center justify-center rounded-r-2xl"
          >
            <div className="w-full h-full text-center">
              <div className="rounded-full flex items-center justify-center mt-7 bg-white mx-48  relative box-border min-w-[70px] min-h-[70px]">
                <img src="/assests/logo.png" alt="" className="ml-2 object-cover w-[30%] h-[30%]" />
              </div>
              <h1 className="text-2xl font-bold mt-3">Hello There!</h1>
              <h1 className=" text-lg md:text-xl font-bold leading-tight mt-1 text-white">
                Welcome to Paymate
              </h1>

              <form action="submit" className="mt-6 px-10 flex flex-col justify-center ">
              
                <div className=" w-full">
                  
                  <input
                    className="w-full px-4 py-1 rounded-lg bg-white  border focus:border-blue-500 focus:bg-white focus:outline-none placeholder-[#40B3BE]"
                    type="text"
                    name="email"
                    placeholder="Email"
                  
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  
                  />
                </div>
                <div className=" w-full mt-3">
                  
                  <input
                    className="w-full px-4 py-1 rounded-lg bg-white  border focus:border-blue-500
                  focus:bg-white focus:outline-none placeholder-[#40B3BE]"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
             
                  />
                </div>
                
                <div className="text-right mt-2">
                  <a
                    href="/"
                    className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                  >
                    Forgot Password?
                  </a>
                </div>
                
                <button
                  className="w-full block bg-[#2176AE] hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-1 py-1 mt-3"
                  onClick={handleSubmit}
                >
                  Login
                </button>
                <div className='w-full mt-3 flex justify-center items-center  px-4' >
                  <div id="signInDiv" className=""></div>
                </div>
               

              </form>
              <p className="mt-4">
                Need an account?
                <a
                  href="/signup"
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Create an account
                </a>
              </p>

              <p className="text-sm text-gray-500 mt-4">
                &copy; 2022 PayMate - All Rights Reserved.
              </p>
            </div>
          </div>
        </section>
      </div>

    </>
  );
};

export default Signin;
