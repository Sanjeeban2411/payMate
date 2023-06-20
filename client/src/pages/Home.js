import React from "react";
import Navbar from "../components/Navbar";
// import Navbar from '../components/Navbar'
// import BarChart from './BarChart'

export default function Home() {
  return (
    // <div className="h-screen w-full">
    //     {/* <Navbar/> */}
    //   <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4  font-Montserrat">
    //     <div className=" flex flex-col md:flex-row">
    //     <div className="flex flex-col justify-center h-full">
    //       <h3 className="text-2xl sm:text-5xl font-extrabold mt-10">
    //         <span className=" text-[#2176AE]">“</span>Splitting your{" "}
    //         <span className=" text-[#2176AE]">bills</span> has never been this{" "}
    //         <span className=" text-[#2176AE]">easy”</span>
    //       </h3>
    //       <h6 className="text-sm sm:text-lg mt-2 ">
    //         Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
    //         sint. Velit officia consequat
    //       </h6>
    //     </div>

    //     <div className=" h-[500px]">
    //       <img
    //         src="./assests/home.png"
    //         alt=""
    //         className="rounded-2xl mx-auto sm:mt-16 sm:ml-16 w-2/3 md:w-full"
    //       />
    //     </div>
    //     </div>
    //     <div className=" lg:mr-6 xl:mr-28 py-2 px-6 text-lg mb-4 rounded-[10px] bg-black text-white ">
    //         <a href='/signup' className='text-white  no-underline'>Join Us</a>
    //     </div>
    //     <div className=" absolute left-0 top-[75%] w-[250px] md:top-[65%] lg:top-[60%] md:w-[400px] lg:w-[550px]">
    //         <img src="./assests/cashless.png" alt=""/>
    //     </div>
    //     <div className="lg:ml-6 xl:ml-28 py-2 px-6 text-lg mt-16 mb-32 rounded-[10px] bg-[#2176AE] text-white ">
    //         <a href='/signin' className='text-white  no-underline'>Sign In</a>
    //     </div>
    //     <div className=" absolute right-0 w-[400px] top-[72%] lg:top-[62%]  lg:w-[550px] ">
    //     <img src="./assests/cashless-2.png" alt="" className=" "/>
    //     </div>
    //     <div className=" absolute top-[120%]">
    //       <img src="./assests/homebg.png" alt="" />
    //     </div>
    //     <div className=" relative text-center  font-black top-[50%] w-[500px]">
    //     <h4>“Amet minim mollit non deserunt ullamco est sit aliqua dolor do”</h4>
    //     </div>
    //     <div className=" absolute  top-[210%] ">
    //       <div className=" static">
    //       <img src="./assests/iconbg.png" alt="" className=" absolute left-0 bottom-0 w-[800px]" />
          
    //       <div className="static">
    //       <img src="./assests/homebg-2.png" alt="" className="" />
    //       <h2 className=" text-white static">Contact Us</h2>
    //       </div>
          
    //       </div>
    //       <div>
          
    //       </div>
    //     </div>
        
    //   </div>
      
    // </div>
    <div className="h-screen w-full">
  {/* Navbar */}
  <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 font-Montserrat">
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col justify-center h-full">
        <h3 className="text-2xl sm:text-5xl font-extrabold mt-10">
          <span className="text-[#2176AE]">“</span>Splitting your{" "}
          <span className="text-[#2176AE]">bills</span> has never been this{" "}
          <span className="text-[#2176AE]">easy”</span>
        </h3>
        <h6 className="text-sm sm:text-lg mt-2">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat
        </h6>
      </div>

      <div className="h-[500px]">
        <img
          src="./assests/home.png"
          alt=""
          className="rounded-2xl mx-auto sm:mt-16 sm:ml-16 w-2/3 md:w-full"
        />
      </div>
    </div>

    <div className="lg:mr-6 xl:mr-28 py-2 px-6 text-lg mb-4 rounded-[10px] bg-black text-white">
      <a href="/signup" className="text-white no-underline">
        Join Us
      </a>
    </div>

    <div className="absolute left-0 top-[75%] w-[250px] md:top-[65%] lg:top-[60%] md:w-[400px] lg:w-[550px]">
      <img src="./assests/cashless.png" alt="" />
    </div>

    <div className="lg:ml-6 xl:ml-28 py-2 px-6 text-lg mt-16 mb-32 rounded-[10px] bg-[#2176AE] text-white">
      <a href="/signin" className="text-white no-underline">
        Sign In
      </a>
    </div>

    <div className="absolute right-0 w-[400px] top-[72%] lg:top-[62%] lg:w-[550px]">
      <img src="./assests/cashless-2.png" alt=""/>
      </div>
      {/* <div className="relative">
  <img src="./assets/homebg.png" alt="" className="absolute top-0 left-0 w-full" />

  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <h4 className="text-center font-black">“Amet minim mollit non deserunt ullamco est sit aliqua dolor do”</h4>
  </div>

  <div className="relative">
    <img src="./assets/iconbg.png" alt="" className="absolute left-0 bottom-0 w-full" />

    <div className="relative bg-white p-8">
      <img src="./assets/homebg-2.png" alt="" className="mx-auto mb-8" />

      <h2 className="text-3xl font-bold text-center mb-4">Contact Us</h2>

      
    </div>
  </div>
      </div> */}
      </div>
      </div>
  );
}
