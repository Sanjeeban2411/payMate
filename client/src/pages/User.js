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
    if(amount <=0 ){
      setamount("")
      setpurpose("")
      return alert("You cannot enter 0 or negative amount")
    }
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
          <div className=" absolute w-full h-screen top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-black">
            <div className="flex flex-row h-[100vh]">
              <div className="flex flex-col justify-center  items-center ">
                <div className="">
                  <h2 className="ml-16 font-black">“Add all your <span className="text-[#2176AE]">expenses</span> and keep <span className="text-[#2176AE]">keep track</span> of your budget” </h2>
                </div>
                <div className=" relative text-white border-2 border-black">
                  <img src="./assests/wallet.png" alt="" className="top-10  " />
                  <div className=" absolute top-[60%] right-[35%] ">
                  <h2 className="p-2">Total Amount Spent</h2>
                  <p className="text-[#E18A07] font-extrabold">₹{total}</p>
                  </div>
                </div>
              </div>
              <div className="mx-4">
                <div className="w-[700px] h-[500px] bg-[#91D9F8] ">
                <h1>Hey There!!!</h1>
                <p>{data.name}</p>
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
