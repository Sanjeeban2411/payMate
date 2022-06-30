import React from 'react'
import Navbar from '../components/Navbar';

const Home = () => {

  const [data, setData] = React.useState(null);


  //   React.useEffect(() => {
  //     const url = "/test";

  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(url)
  //         const json = await response.json()
  //         console.log(json)
  //       } catch (error) {
  //         console.log("error", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  console.log(data)

  return (
    <div>
      <Navbar/>
      <div className=' absolute w-full h-[60%] top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-[#E18A07] px-10'>
        <div className=' font-extrabold flex-col'>Hey There!</div>

        <div className='pt-2 text-black text-xl'><div className=''>John Doe</div></div>
        {/* <p>{!data ? "Loading..." : data}</p> */}

        <div className=' pt-12 text-black font-bold'>Monthly Spend</div>
        <div className=' pt-8 text-black font-bold'><spam className='text-[#E18A07]'>5,345</spam>/10,000</div>
        <div className='flex-row pt-8'>
          <div className=' w-[30%] h-9 bg-[#D9D9D9]'><div className=' w-[50%] h-9 bg-black'></div></div>
        </div>
        <div className='text-black text-xl pt-12 '>“You are doing great and wont exceed your budget”</div>
      </div>
      <img className=' pl-[50%] h-[446px] pt-[5rem]' src='/assests/home.png' alt="try" />
    </div>
  )
}

export default Home