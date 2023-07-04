import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleLogin from 'react-google-login';
import wallet from "../assests/Wallet-1.png"

const User = () => {
  const [purpose, setpurpose] = useState();
  const [amount, setamount] = useState();

  const [data, setdata] = useState("");
  const [expenseData, setExpenseData] = useState("");
  const [allExpenses, setAllExpenses] = useState([]);

  const navigate = useNavigate()

  const x = localStorage.getItem("jwt_token");
  // console.log(x)
  // console.log("aaa", allExpenses);
  useEffect(() => {
    axios({
      method: "get",
      url: "https://paymate-back.onrender.com/user",
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        console.log("done");
        // console.log(response)
        setdata(response.data);
        // console.log("16", response.data)
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          console.log("unauth")
          navigate(`/signin`)
        }
        // console.log("unauth")
      })
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://paymate-back.onrender.com/getexpenses",
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        setAllExpenses(response.data);
        console.log("paisa", response.data);
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          console.log("unauth")
          navigate(`/signin`)
        }
        // console.log("unauth")
      })
  }, []);


  const addExpense = (e) => {
    e.preventDefault();

    // setExpenseData({
    //   purpose: purpose,
    //   amount: amount,
    // });
    toast.success('Successfully Added !', {
      position: toast.POSITION.TOP_RIGHT
  });

    if (amount <= 0) {
      setamount("")
      setpurpose("")
      return alert("You cannot enter 0 or negative amount")
    }
    axios({
      method: "post",
      url: "https://paymate-back.onrender.com/addexpense",
      data: {
        purpose: purpose,
        amount: Number(amount),
      },
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        setamount("")
        setpurpose("")
        // setExpenseData({
        //   purpose: "",
        //   amount: "",
        // })
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          console.log("unauth")
          navigate(`/signin`)
        }
        // console.log("unauth")
      })
  };

  const total = allExpenses.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
  // console.log("tt",purpose)

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}/${month}/${year}`;
  console.log("todays date", currentDate);

  return (
    <>
      
      {data && (
        <div className=" flex flex-col">
          <Navbar />
          <div className=" w-full h-[100vh] pt-20 grid grid-cols-5 ">
            <div className=" relative col-span-3 w-full h-full flex flex-col ">
              <div className=" px-24 py-6"><div className=" font-black text-3xl ">“Add all your <span className="text-[#2176AE]">expenses</span> and <span className="text-[#2176AE]">keep track</span> of your budget” </div></div>
              <div className="   w-[60%] h-[40%] wallet-bg">
                {/* <img src={wallet} alt="" className=" " /> */}
              </div>
              <div className="  flex flex-col">
              <div>Total Amount Spent</div>
              <div>₹{total}</div>
              </div>
            </div>
            <div className=" col-span-2 py-3 px-12 w-full h-full flex">
              <div className=" bg-black w-[5%] rounded-l-[20px] h-full "></div>
              <div className=" w-full h-full flex flex-col">
                <div className=" bg-[#113248] w-full rounded-tr-[20px] h-24 py-3 px-3 flex flex-col justify-around">
                  <div className=" text-[#9FD7FC] text-xl font-semibold">Hey There!</div>
                  <div className=" w-full flex justify-between text-white ">
                    <div className=" text-xl">{data.name}</div>
                    <div className="text-xl ">{currentDate}</div>
                  </div>
                </div>
                <div className=" w-full h-full  flex flex-col justify-around py-10 px-16" id="bg-form">
                  <div className="">
                    <label className=" text-3xl ">Amount</label>
                    <div className=" my-2"><input
                      className=" border-b-2 border-black focus:outline-none bg-transparent w-full placeholder-black placeholder:font-bold placeholder:text-xl"
                      type="number"
                      min={0}
                      placeholder="₹"
                      onChange={(e) => {
                        setamount(e.target.value);
                    
                      }}
                      value={amount}
                    /></div>
                  </div>
                  <div className=" ">
                    <label className=" text-3xl ">Category</label>
                    <div className=" my-2"><input
                      className=" border-b-2 border-black focus:outline-none bg-transparent w-full placeholder-black placeholder:font-bold placeholder:text-xl"
                      type="text"
                      placeholder="Travel"
                      onChange={(e) => {
                        setpurpose(e.target.value);
                    

                      }}
                      value={purpose}
                    /></div>
                  </div>
                  <div className=" w-full flex justify-center items-center ">
                    <div><button className=" px-3 py-2 text-white bg-black rounded-lg">Add Spend</button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className=" absolute w-full h-[80vh]   mt-24 font-Montserrat text-3xl  text-black">
            <div className="flex flex-row ">
              <div className="flex flex-col ">
                <div className="">
                
                  <h1 className="  relative ml-24 mt-16 font-black ">“Add all your <span className="text-[#2176AE]">expenses</span> and keep <span className="text-[#2176AE]">keep track</span> of your budget” </h1>
                  
                </div>
                <div className=" absolute text-white bottom-0 left-0  h-[200px]">
                  <div><img src="./assests/Wallet-1.png" alt="" className=" h-full " /></div>
                  <div className="  ">
                    <h2 className="p-2">Total Amount Spent</h2>
                    <p className="text-[#E18A07] text-4xl font-extrabold">₹{total}</p>
                  </div>
                </div>
              </div>
              <div className=" mx-4 flex flex-row  h-[100%]">
                <div className=" bg-[#113248] w-[30px] h-[100%] rounded-l-xl">
                </div>
                <div className=" flex flex-col">
                  <div className="w-[450px] h-[20%] bg-[#113248] text-white rounded-tr-xl" >
                    <h2 className="ml-4 text-[#9FD7FC] pt-2">Hey There!!!</h2>
                    <div className=" flex flex-row justify-between mx-3">
                      <p className="">{data.name}</p>
                      <p className="">{currentDate}</p>
                    </div>
                  </div>
                  <div className="flex flex-col  w-[100%] h-[100%] rounded-br-xl " id="bg-form">
                    <label className="mt-20 mx-24 font-bold">Amount</label>
                    <input
                      className="relative border-b-2 border-black bg-transparent p-2 w-[300px] mx-auto placeholder-black placeholder:font-bold"
                      type="number"
                      min={0}
                      placeholder="₹"
                      onChange={(e) => {
                        setamount(e.target.value);
                    
                      }}
                      value={amount}
                    />
                    <label className=" mt-8 mx-24 font-bold">Category</label>
                    <input
                      className=" relative border-b-2 border-black bg-transparent p-2 w-[300px] mx-auto placeholder-black placeholder:font-bold"
                      type="text"
                      placeholder="Travel"
                      onChange={(e) => {
                        setpurpose(e.target.value);
                    

                      }}
                      value={purpose}
                    />
                    <button
                      className="flex justify-center items-center bg-black text-xl text-white mx-auto p-2 px-4 rounded-md my-5"
                      onClick={addExpense}
                    >
                      Add Spend
                    </button>
                    <ToastContainer />
                  </div>
                </div>

              </div>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default User;
