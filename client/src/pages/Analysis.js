import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios, { Axios } from "axios";
// import BarChart from '../components/BarChart'
import BarChartAnalyze from '../components/BarChartAnalyze';
import BarChartWeek from '../components/BarChartWeek';
import BarChartDaily from '../components/BarChartDaily';

const Analysis = () => {

  const [purpose, setpurpose] = useState();
  const [amount, setamount] = useState();
  const [limit, setLimit] = useState(true);

  const [data, setdata] = useState("");
  const [expenseData, setExpenseData] = useState("");
  const [allExpenses, setAllExpenses] = useState([]);
  // const [pagination, setPagination] = useState([]);

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
        // setAllExpenses(allExpenses.reverse())
        console.log("paisa", response.data);
      })
      .catch((error) => console.log(error));
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
      .catch((error) => console.log(error));
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
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[num - 1];
  }
  function weekname(value) {
    let week = ["Week-1", "Week-2", "Week-3", "Week-4"];
    return week[value - 1];
  }
  const date = allExpenses.map((totl) => {
    return (
      monthname(totl.updatedAt.slice(6, 7))
    );
  })
  const weekdata = allExpenses.map((tot) => {
    return (
      // console.log("ccc",tot.updatedAt.slice(9,10))
      weekname(Math.ceil((tot.updatedAt.slice(8, 10)) / 7))
    );
  })
  console.log("weeknam", weekdata)
  //  console.log("date",date)
  // date[3]="September"
  // date[4]="September"
  // date[5]="October"
  console.log("month", date)

  //  console.log("m-w",weekdata[0].concat("-",date[0]))
  let analyze = allExpenses

  if (analyze.length > 0) {
    for (let i = 0; i < analyze.length; i++) {
      analyze[i].createdAt = date[i];

    }
    console.log("arr", analyze)
  }

  console.log("analyze", analyze)

  let weeks = allExpenses

  if (weeks.length > 0) {
    for (let i = 0; i < weeks.length; i++) {
      weeks[i].createdAt = weekdata[i].concat("/", date[i]);

    }
    console.log("wname", weeks)
  }

  console.log("analyze", analyze)

  let w_m = []

  if (allExpenses.length > 0) {
    for (let i = 0; i < allExpenses.length; i++) {
      w_m[i] = weekdata[i].concat("/", date[i]);
    }
    console.log("w__m", w_m);
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const Month = date.filter(onlyUnique)
  console.log("data", Month)
  const weedata = w_m.filter(onlyUnique)
  console.log("www", weedata)

  // let tamt=([])
  let sum
  let kharcha = []
  if (analyze.length > 0) {
    sum = analyze[0].amount
    // console.log("amt",analyze[0].createdAt)
    for (let i = 0; i < analyze.length - 1; i++) {
      // console.log("test",analyze[i].createdAt,analyze[i].amount)
      // console.log("test",analyze[i+1].createdAt,analyze[i+1].amount)
      if (analyze[i].createdAt === analyze[i + 1].createdAt) {
        sum = sum + analyze[i + 1].amount
      }
      else {
        kharcha.push(sum)
        sum = analyze[i + 1].amount
        // kharcha.push(sum)
      }
    }
    kharcha.push(sum)
  }
  console.log("sm", sum)
  console.log("y axis", kharcha)

  // week amt

  let weeksum
  let weekkharcha = []
  if (weeks.length > 0) {
    weeksum = weeks[0].amount
    console.log("amt", weeks[0].createdAt)
    for (let i = 0; i < weeks.length - 1; i++) {
      // console.log("weektest", weeks[i].createdAt, weeks[i].amount)
      // console.log("weektesttest", weeks[i + 1].createdAt, weeks[i + 1].amount)
      if (weeks[i].createdAt === weeks[i + 1].createdAt) {
        weeksum = weeksum + weeks[i + 1].amount
      }
      else {
        weekkharcha.push(weeksum)
        weeksum = weeks[i + 1].amount
        // kharcha.push(sum)
      }
    }
    weekkharcha.push(sum)
  }
  console.log("sm-week", weeksum)
  console.log("y axis week", weekkharcha)



  //  const monthName=months[date.getMonth()];
  //  console.log("month",monthName)
  // console.log("data",data)
  // console.log("expensedata",expenseData)
  // console.log("allexpense",allExpenses)


  const [ddd,setDDD]=useState()

  const handleoption=(e)=>{
    const getvalue=e.target.value
    let show=getvalue
    setDDD(show)
  }
  console.log(ddd)

  const total = allExpenses.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);


  if (allExpenses.length > 0) {
    let a = new Date(allExpenses[0].updatedAt)
    console.log("date", a.toLocaleDateString("en-US"))
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
                <div className='flex flex-col justify-between  w-full h-[600px] '>
                  <div>
                    <img src='./assests/Vector-14.png' alt="" className='w-80' />
                    <div className=' font-black text-4xl ml-12'>

                      <p>All your Expenses</p>
                      <p><span className='text-[#2176AE]'>analysed</span> in one page</p>
                    </div>
                    <img src='./assests/Vector-14.png' alt="" className='w-80 ml-40' />
                  </div>
                  <div className=" relative text-white  h-[400px] ">
                  <img src="./assests/Wallet-1.jpeg" alt="" className=" h-[420px] bg-black" />
                  <div className=" absolute top-[40%] right-[45%] ">
                  <h2 className="p-2">Total Amount Spent</h2>
                  <p className="text-[#E18A07] text-4xl font-extrabold">₹{total}</p>
                  </div>
                </div>
                </div>
                <div className='flex flex-col'>
                  <div className=' rounded-tl-xl p-14 bg-slate-300 ml-3 w-[800px] flex flex-col'>
                    <div className='right-0'>
                    <select onChange={(e)=>handleoption(e)}>
        <option value="Monthly">Monthly</option>
        <option value="Weekly">Weekly</option>
        <option value="Daily">Daily</option>
      </select>
                    </div>
                    <div className=''>
                      
                      <div className="mx-auto bg-white">
                        {/* <BarChartAnalyze /> */}
                        {/* ({<BarChartWeek/>}) */}
                        <BarChartDaily/>
                      </div>
                      
                    </div>

                  </div>
                  <div className='w-[800px] h-10 ml-3 rounded-bl-3xl bg-black'>
                  </div>
                </div>

              </div>


              <div className='border-2  my-24 mx-32 rounded-t-xl bg-white' id="tranbg">
                <div className="p-4 bg-[#E18A07] rounded-t-xl">
                  <h2 className='text-center'>Previous Transaction</h2>
                </div>
                <div className="mt-6  mx-20">
                  {/* {limit && pagination.reverse().map((name) => { */}
                  {limit && allExpenses.reverse().filter((name, idx) => idx < 5).map((name) => {
                    return (
                      <>
                        <div className=' p-2 flex justify-between'>
                          <div>
                            {name.purpose}
                          </div>
                          <div>
                            {name.updatedAt}
                            {/* {new Date(name.updatedAt)} */}
                          </div>
                          <div>₹{name.amount}</div>
                        </div>
                        <hr className='' />
                      </>
                    );
                  })}

                  {!limit && allExpenses.reverse().map((name) => {
                    return (
                      <>
                        <div className=' p-2 flex justify-between'>
                          <div>
                            {name.purpose}
                          </div>
                          <div>
                            {name.updatedAt}
                          </div>
                          <div>₹{name.amount}</div>
                        </div>
                        <hr className='' />
                      </>
                    );
                  })}

                  <div className='border-1 rounded-lg border-black'>
                    <button onClick={() => setLimit(!limit)} className=" mx-[330px] ">

                      {limit ? "Show more" : "Show less"}

                    </button>
                  </div>
                </div>
              </div>
              {/* <div className='mt-2'></div> */}
            </div>
          </div>
        </div>
      )}

    </>

  )
}

export default Analysis


{/* <form className="max-w-[1100px] mx-auto w-full rounded-md border-2 border-black p-8 mt-2">
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
          </form> */}