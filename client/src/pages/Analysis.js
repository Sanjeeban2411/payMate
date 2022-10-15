import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios, { Axios } from "axios";
// import BarChart from '../components/BarChart'
import BarChartAnalyze from "../components/BarChartAnalyze";
import BarChartWeek from "../components/BarChartWeek";
import BarChartDaily from "../components/BarChartDaily";

const Analysis = () => {
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
      url: "/getexpenses",
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
      url: "/addexpense",
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

  // if (allExpenses.length > 0) {
  //   let count = []
  //   if (limit) {
  //     for (let i = 0; i < 10; i++) {
  //       count.push(allExpenses[i])
  //     }
  //     // setPagination(count)
  //   }
  //   else {
  //     setPagination(allExpenses)
  //   }
  //   console.log("pagination", pagination)
  // }

  function monthname(num) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[num - 1];
  }
  function weekname(value) {
    let week = ["Week-1", "Week-2", "Week-3", "Week-4"];
    return week[value - 1];
  }
  const date = allExpenses.map((totl) => {
    console.log("ccc1", totl.updatedAt.slice(5, 7));
    return monthname(totl.updatedAt.slice(6, 7));
  });
  const weekdata = allExpenses.map((tot) => {
    console.log("cccabc", tot.updatedAt.slice(8, 10) / 7);
    {
      if (tot.updatedAt.slice(8, 10) > 28) {
        return weekname(Math.floor(tot.updatedAt.slice(8, 10) / 7));
      } else {
        return weekname(Math.ceil(tot.updatedAt.slice(8, 10) / 7));
      }
    }
  });
  console.log("weeknam", weekdata);
  //  console.log("date",date)
  // date[3]="September"
  // date[4]="September"
  // date[5]="October"
  console.log("month", date);

  //  console.log("m-w",weekdata[0].concat("-",date[0]))
  let analyze = allExpenses;

  if (analyze.length > 0) {
    for (let i = 0; i < analyze.length; i++) {
      analyze[i].createdAt = date[i];
    }
    console.log("arr", analyze);
  }

  console.log("analyze", analyze);

  let weeks = allExpenses;

  if (weeks.length > 0) {
    for (let i = 0; i < weeks.length; i++) {
      weeks[i].createdAt = weekdata[i].concat("/", date[i]);
    }
    console.log("wname", weeks);
  }

  console.log("analyze", analyze);

  let w_m = [];

  if (allExpenses.length > 0) {
    for (let i = 0; i < allExpenses.length; i++) {
      w_m[i] = weekdata[i].concat("/", date[i]);
    }
    console.log("w__m", w_m);
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const Month = date.filter(onlyUnique);
  console.log("data", Month);
  const weedata = w_m.filter(onlyUnique);
  console.log("www", weedata);

  // let tamt=([])
  let sum;
  let kharcha = [];
  if (analyze.length > 0) {
    sum = analyze[0].amount;
    // console.log("amt",analyze[0].createdAt)
    for (let i = 0; i < analyze.length - 1; i++) {
      // console.log("test",analyze[i].createdAt,analyze[i].amount)
      // console.log("test",analyze[i+1].createdAt,analyze[i+1].amount)
      if (analyze[i].createdAt === analyze[i + 1].createdAt) {
        sum = sum + analyze[i + 1].amount;
      } else {
        kharcha.push(sum);
        sum = analyze[i + 1].amount;
        // kharcha.push(sum)
      }
    }
    kharcha.push(sum);
  }
  console.log("sm", sum);
  console.log("y axis", kharcha);

  // week amt

  let weeksum;
  let weekkharcha = [];
  if (weeks.length > 0) {
    weeksum = weeks[0].amount;
    console.log("amt", weeks[0].createdAt);
    for (let i = 0; i < weeks.length - 1; i++) {
      // console.log("weektest", weeks[i].createdAt, weeks[i].amount)
      // console.log("weektesttest", weeks[i + 1].createdAt, weeks[i + 1].amount)
      if (weeks[i].createdAt === weeks[i + 1].createdAt) {
        weeksum = weeksum + weeks[i + 1].amount;
      } else {
        weekkharcha.push(weeksum);
        weeksum = weeks[i + 1].amount;
        // kharcha.push(sum)
      }
    }
    weekkharcha.push(sum);
  }
  console.log("sm-week", weeksum);
  console.log("y axis week", weekkharcha);

  //  const monthName=months[date.getMonth()];
  //  console.log("month",monthName)
  // console.log("data",data)
  // console.log("expensedata",expenseData)
  console.log("allexpense", allExpenses)


  const [view, setView] = useState("Daily");

  // useEffect(() => {
  const handleoption = (e) => {
    const getvalue = e.target.value;
    let show = getvalue;
    setView(show);
  };
  // }, [0]);
  console.log("view", view);

  const total = allExpenses
    .map((item) => item.amount)
    .reduce((prev, curr) => prev + curr, 0);

  if (allExpenses.length > 0) {
    let a = new Date(allExpenses[0].updatedAt);
    console.log("date", a.toLocaleDateString("en-US"));
  }
  //  const h = window.screen.availHeight
  //  const w = window.screen.availWidth
  //   console.log("H",h)
  //   console.log("W",w)

  return (
    <>
      {data && (
        <div>
          <Navbar />
          <div className=" absolute w-full h-[120%] top-50% flex flex-col mt-16 font-Montserrat text-3xl  text-black">
            {/* <div className="font-extrabold mb-5 pb-10">Monthly Expenses</div> */}
            <div id="anabg">
              <div className="flex flex-row justify-between items-center h-screen ">
                <div className="flex flex-col justify-between  w-full h-[600px] ">
                  <div>
                    <img
                      src="./assests/Vector-14.png"
                      alt=""
                      className="w-80"
                    />
                    <div className=" font-black text-4xl ml-12">
                      <p>All your Expenses</p>
                      <p>
                        <span className="text-[#2176AE]">analysed</span> in one
                        page
                      </p>
                    </div>
                    <img
                      src="./assests/Vector-14.png"
                      alt=""
                      className="w-80 ml-40"
                    />
                  </div>
                  <div className=" relative text-white  h-[400px] ">
                    <img
                      src="./assests/Wallet-1.png"
                      alt=""
                      className=" h-[420px]"
                    />
                    <div className=" absolute top-[40%] right-[45%] ">
                      <h2 className="p-2">Total Amount Spent</h2>
                      <p className="text-[#E18A07] text-4xl font-extrabold">
                        ₹{total}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className=" rounded-tl-xl p-14 bg-slate-300 ml-3 w-[800px] flex flex-col">
                    <div className="right-0 ">
                      <select
                        onChange={(e) => handleoption(e)}
                        className="bg-slate-300 text-2xl"
                      >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                      </select>
                    </div>
                    <div className="">
                      <div className="mx-auto  bg-transparent">
                        {view === "Daily" ? (
                          <BarChartDaily />
                        ) : view === "Weekly" ? (
                          <BarChartWeek />
                        ) : (
                          <BarChartAnalyze />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-[800px] h-10 ml-3 rounded-bl-3xl bg-black"></div>
                </div>
              </div>
              <div
                className="border-2  my-24 mx-52 rounded-t-xl bg-white"
                id="tranbg"
              >
                <div className="p-4 bg-[#E18A07] rounded-t-xl">
                  <h2 className="text-center">Previous Transaction</h2>
                </div>
                <div className="mt-6 font-MinionPro">
                  {
                    allExpenses.filter((name, idx) => {
                      return (limit ? idx < 5 : name)
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

                  <div className="text-center">
                    <button
                      onClick={() => setLimit(!limit)}
                      className=" border-[3px] rounded-[10px] border-black py-2 px-3 "
                    >
                      {limit ? "Show more" : "Show less"}
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

export default Analysis;


