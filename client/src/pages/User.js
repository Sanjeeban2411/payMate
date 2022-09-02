import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import Navbar from "../components/Navbar";

const User = () => {
  const [purpose, setpurpose] = useState();
  const [amount, setamount] = useState();

  const [data, setdata] = useState("");
  const [expenseData, setExpenseData] = useState("");
  const [allExpenses, setAllExpenses] = useState([]);

  const x = localStorage.getItem("jwt_token");
  // console.log(x)
  // console.log("aaa", allExpenses);
  useEffect(() => {
    axios({
      method: "get",
      url: "/user",
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
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "/getexpenses",
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        setAllExpenses(response.data);
        console.log("paisa", response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  
  const addExpense = (e) => {
    e.preventDefault();
    // setExpenseData({
    //   purpose: purpose,
    //   amount: amount,
    // });
    axios({
      method: "post",
      url: "/addexpense",
      data: {purpose: purpose,
          amount: amount,},
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
      .catch((error) => console.log(error));
  };

  const total = allExpenses.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
  // console.log("tt",purpose)

  return (
    <>
      {/* {data && total && allExpenses && ( */}
      {data && (
        <div>
          <Navbar />
          <div className=" absolute w-full h-[60%] top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-black px-10">
            <div className=" font-extrabold flex-col">
              Hey There!
            </div>

            <div className="pt-4 text-black text-3xl">
              <div className="text-[#E18A07] font-extrabold">{data.name}</div>
            </div>
            {/* <p>{!data ? "Loading..." : data}</p> */}

            <div className=" pt-12 text-black font-bold">Total Spend</div>
            <div className=' pt-6 text-black font-bold'><div className='text-[#E18A07]'>₹{total}</div></div>

            {/* <div className='flex-row pt-8'>
            <div className=' w-[30%] h-9 bg-[#D9D9D9]'><div className=' w-[50%] h-9 bg-black'></div></div>
          </div> */}
            <div className="flex flex-col justify-center items-center h-full pt-8">
              <div className='max-w-[1150px] mx-auto w-full rounded-md border-2 border-black p-3 mt-12'>
              <form className="max-w-[1100px] mx-auto w-full rounded-md border-2 border-black p-3 mt-2">
                <h2 className="text-4xl font-bold text-center py-6">
                  ENTER YOUR EXPENSES
                </h2>
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex flex-col mb-4">
                    <label className="text-center">Amount</label>
                    <input
                      className="relative border-2 border-black bg-gray-100 p-2 w-[300px] mx-auto"
                      type="number"
                      placeholder="₹ Amount"
                      onChange={(e) => {
                        setamount(e.target.value);
                        // setExpenseData({
                        //   purpose: expenseData.purpose,
                        //   amount: e.target.value,
                        // });
                      }}
                      value={amount}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="text-center">Category</label>
                    <input
                      className="border-2 border-black relative bg-gray-100 p-2 w-[300px] mx-auto"
                      type="text"
                      placeholder="Food"
                      onChange={(e) => {
                        setpurpose(e.target.value);
                        // setExpenseData({
                        //   purpose: e.target.value,
                        //   amount: expenseData.amount,
                        // });

                      }}
                      value={purpose}
                    />
                  </div>
                </div>
                <button
                  className="flex justify-center items-center bg-black text-white mx-auto p-2 rounded-md my-2"
                  onClick={addExpense}
                >
                  Add Spend
                </button>
              </form>
              </div>
            </div>
          </div>
          <img
            className=" pl-[60%] h-[370px] pt-[4rem]"
            src="/assests/home.png"
            alt="try"
          />
        </div>
      )} 
    </>
  );
};

export default User;
