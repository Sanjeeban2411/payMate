import React from "react";
// import Navbar from '../components/Navbar'
// import BarChart from './BarChart'

export default function Home() {
  return (
    <div className="h-screen w-full">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4  font-Montserrat">
        <div className=" flex flex-col md:flex-row">
        <div className="flex flex-col justify-center h-full">
          <h3 className="text-2xl sm:text-6xl font-extrabold">
            <span className=" text-[#2176AE]">“</span>Splitting your{" "}
            <span className=" text-[#2176AE]">bills</span> has never been this{" "}
            <span className=" text-[#2176AE]">easy”</span>
          </h3>
          <h6 className="text-sm sm:text-lg mt-4 ">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat
          </h6>
        </div>

        <div className=" h-[400px]">
          <img
            src="./assests/home.png"
            alt=""
            className="rounded-2xl mx-auto w-2/3 md:w-full"
          />
        </div>
        </div>
        <div className=" py-2 px-6 text-lg rounded-[10px] bg-black text-white ">
            Join Us
        </div>
        <div className=" absolute left-0 md:top-[65%] lg:top-[60%] md:w-[500px] lg:w-[600px]">
            <img src="./assests/cashless.png" alt=""/>
        </div>
        <div className=" py-2 px-6 text-lg mt-28 rounded-[10px] bg-[#2176AE] text-white ">
            Sign In
        </div>
        <div>
        <img src="" alt=""/>
        </div>
      </div>
      
    </div>
  );
}
