import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";

const AnalysisLog = () => {

    const [purpose, setpurpose] = useState();
  const [amount, setamount] = useState();
  const [limit, setLimit] = useState(true);

  const [data, setdata] = useState("");
  const [expenseData, setExpenseData] = useState("");
  const [allExpenses, setAllExpenses] = useState([]);

  // const [graphView, setGraphView] = useState("daily");
  let navigate = useNavigate();

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
        console.log(error);
        if (error.response.status === 401) {
          console.log("unauth");
          navigate(`/signin`);
        }
      });
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
        setAllExpenses(response.data.reverse());
        // setAllExpenses(allExpenses.reverse())
        console.log("paisa", response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          console.log("unauth");
          navigate(`/signin`);
        }
      });
  }, []);

  const addExpense = (e) => {
    e.preventDefault();
    setExpenseData({
      purpose: purpose,
      amount: amount,
    });

    axios({
      method: "post",
      url: "https://paymate-back.onrender.com/addexpense",
      data: expenseData,
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          console.log("unauth");
          navigate(`/signin`);
        }
      });
  };
  console.log("expense",allExpenses)
  console.log("data",data)

  return (
    <div>
        <Navbar/>
      <div
                className="border-2  my-24 mx-52 rounded-t-xl bg-white text-3xl"
                id="tranbg"
              >
                <div className="p-4 bg-[#E18A07] rounded-t-xl">
                  <h2 className="text-center">All Transactions</h2>
                </div>
                <div className="mt-6 font-MinionPro">
                  {
                    allExpenses.filter((name, idx) => {
                      return (name)
                    })
                      .map((name) => {
                        return (
                          <>
                            <div className="p-2 grid grid-cols-3 gap-4">
                              <div className=" text-center">
                                {name.purpose}
                              </div>
                              <div className=" text-center">
                                <div className=" flex flex-row justify-around mx-auto">
                                <div className="mx-auto">{name.room ? name.room.name : "Self"}</div>
                                <div className= {name.room  ? name.room.name :"hidden mx-auto"}><img src="./assests/Vector.png" alt="" className=""/></div>
                                </div>
                                {name.updatedAt.slice(0, 10)}{"  "}
                                {name.updatedAt.slice(11, 16)}
                              </div>
                              <div className=" text-center">
                                ₹{name.amount}
                              </div>
                            </div>
                            <hr className="mx-16" />
                          </>
                        );
                      })
                  }
                </div>
                </div>
    </div>
  )
}

export default AnalysisLog
