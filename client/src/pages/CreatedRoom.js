import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { FaUserSecret } from "react-icons/fa";
import BarChart from "./BarChart";

const CreatedRoom = () => {
  const [purpose, setpurpose] = useState();
  const [amount, setamount] = useState();

  const [roomName, setRoomName] = useState("");
  const [userNames, setUserNames] = useState([]);
  const [expenseData, setExpenseData] = useState({});
  const [allExpenses, setAllExpenses] = useState([]);

  const x = localStorage.getItem("jwt_token");
  const room = localStorage.getItem("room");
  // console.log(x)
//   console.log("aaa");
  useEffect(() => {
    axios({
      method: "get",
      url: `/${room}/users`,
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        setRoomName(response.data.room);
        setUserNames(response.data.userNames);
        console.log("data", response.data.room);
        console.log("username", response.data.userNames);
      })
      .catch((error) => console.log(error));
  }, [0]);
  // const getExp = () => {
  // function getExp(){
    
  useEffect(() => {
    axios({
      method: "get",
      url: `/${room}/getexpenses`,
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
    setExpenseData({
      purpose: purpose,
      amount: Number(amount),
    });
    axios({
      method: "post",
      url: `/${room}/addexpense`,
      data: expenseData,
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        // getExp()
        setExpenseData({})
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  // console.log("dataexp",roomName)
//   console.log("user", userNames);
  return (
    <>
      <Navbar />
      <div className=" absolute w-full h-[120%] top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-black px-10">
        <div className="font-extrabold mb-5 pb-10">ROOM - {roomName}</div>
        <div className="flex flex-col justify-center items-center h-full ">
          <div className="mx-auto">
            <BarChart />
          </div>
          {/* <BarChart/> */}
          <form className="max-w-[1100px] mx-auto w-full rounded-md border-2 border-black p-8 mt-12">
            <h2 className="text-4xl font-bold text-center py-6">
              ENTER YOUR EXPENSES
            </h2>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col mb-4">
                <label className="text-center">Amount</label>
                <input
                  className="relative border-2 border-black bg-gray-100 p-2 w-[300px]"
                  type="number"
                  placeholder="₹ Amount"
                  onChange={(e) => {
                    setamount(e.target.value);
                  }}
                  value={amount}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-center">Category</label>
                <input
                  className="border-2 border-black relative bg-gray-100 p-2 w-[300px]"
                  type="text"
                  placeholder="Food"
                  onChange={(e) => {
                    setpurpose(e.target.value);
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

        <div className="mt-12 font-extrabold">Members</div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          {userNames.map((name) => {
            return (
              <div className="flex flex-col border-2 border-black">
                <div className="m-auto mt-4">
                  <FaUserSecret />
                </div>
                <div className="p-4 text-center">{name}</div>
                <button className="bg-black text-white mx-auto p-2 my-3 rounded-md">
                  Expense Details
                </button>
              </div>
            );
          })}
        </div>

        <div>
          <div className="mt-8">
            <b>Expenses</b>
          </div>
          <div className="mt-6 border-2 border-black bg-slate-300">
            {allExpenses.map((name) => {
              return (
                <p>
                  {name.amount} - {name.purpose}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatedRoom;
