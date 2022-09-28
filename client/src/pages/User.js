import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import Navbar from "../components/Navbar";

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
      url: "/getexpenses",
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
    if (amount <= 0) {
      setamount("")
      setpurpose("")
      return alert("You cannot enter 0 or negative amount")
    }
    axios({
      method: "post",
      url: "/addexpense",
      data: {
        purpose: purpose,
        amount: amount,
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
      {/* {data && total && allExpenses && ( */}
      {data && (
        <div>
          <Navbar />
          <div className=" absolute w-full h-[60%] top-50% flex flex-col mt-24 font-Montserrat text-3xl  text-black">
            <div className="flex flex-row h-[80vh]">
              <div className="flex flex-col ">
                <div className="">
                  <h2 className="ml-24 font-black">“Add all your <span className="text-[#2176AE]">expenses</span> and keep <span className="text-[#2176AE]">keep track</span> of your budget” </h2>
                </div>
                <div className=" relative text-white  h-[400px] ">
                  <img src="./assests/Wallet-1.png" alt="" className=" h-[420px]" />
                  <div className=" absolute top-[40%] right-[55%] ">
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
                    <h2 className="ml-4 text-[#9FD7FC]">Hey There!!!</h2>
                    <div className=" flex flex-row justify-between mx-3">
                      <p className="">{data.name}</p>
                      <p className="">{currentDate}</p>
                    </div>
                  </div>
                  <div className="flex flex-col  w-[100%] h-[100%] rounded-br-xl " id="bg-form">
                    <label className="mt-10 mx-24">Amount</label>
                    <input
                      className="relative border-b-2 border-black bg-transparent p-2 w-[300px] mx-auto placeholder-white"
                      type="number"
                      min={0}
                      placeholder="₹"
                      onChange={(e) => {
                        setamount(e.target.value);
                        // setExpenseData({
                        //   purpose: expenseData.purpose,
                        //   amount: e.target.value,
                        // });
                      }}
                      value={amount}
                    />
                    <label className=" mt-8 mx-24 ">Category</label>
                    <input
                      className=" relative border-b-2 border-black bg-transparent p-2 w-[300px] mx-auto placeholder-white"
                      type="text"
                      placeholder="Travel"
                      onChange={(e) => {
                        setpurpose(e.target.value);
                        // setExpenseData({
                        //   purpose: e.target.value,
                        //   amount: expenseData.amount,
                        // });

                      }}
                      value={purpose}
                    />
                    <button
                      className="flex justify-center items-center bg-black text-xl text-white mx-auto p-2 px-4 rounded-md my-5"
                      onClick={addExpense}
                    >
                      Add Spend
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
