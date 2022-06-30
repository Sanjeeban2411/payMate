import React from 'react'

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
    <div className=' absolute w-full h-[90%] top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-[#E18A07] px-10'><div className=' font-extrabold'>Hey There!</div>
      <div className='pt-2 text-black text-xl'><div className='flex-row'>John Doe
        {/* <p>{!data ? "Loading..." : data}</p> */}
        <img className=' pl-[60%] h-[350px] inline p-4' src='/assests/home.png' alt="try" />
        <div className=' pt-10 text-black font-bold'>Monthly Spend</div>
        <div className=' pt-6 text-black font-bold'><spam className='text-[#E18A07]'>5,345</spam>/10,000</div>
        <div className='flex-row pt-4'>
          <div className=' w-[30%] h-9 bg-[#D9D9D9]'><div className=' w-[50%] h-9 bg-black'></div></div>
        </div>
        <div className='text-black text-xl pt-12 '>“You are doing great and wont exceed your budget”</div>

      </div></div>

    </div>
  )
}

export default Home