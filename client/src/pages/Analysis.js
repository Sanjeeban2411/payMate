import React, {useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import axios, { Axios } from "axios";
// import BarChart from '../components/BarChart'
import BarChartAnalyze from '../components/BarChartAnalyze';

const Analysis = () => {

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

  // const total = allExpenses.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
  var  monthse = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function monthname(num) {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return months[num-1];
    }
  const date=allExpenses.map((totl)=>{
    return(
      monthname(totl.updatedAt.slice(6,7))
    );
   })
  //  console.log("date",date)
  date[5]="September"
   console.log("month",date)

   let analyze=allExpenses

  if(analyze.length>0){
    for(let i=0;i<analyze.length;i++){
      analyze[i].createdAt=date[i];
      
   }
   console.log("arr",analyze)
  }

   console.log("analyze",analyze)

   function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const Month=date.filter(onlyUnique)
  console.log("data",Month)

  if(analyze)

  //  const monthName=months[date.getMonth()];
  //  console.log("month",monthName)
  // console.log("data",data)
  // console.log("expensedata",expenseData)
  console.log("allexpense",allExpenses)


  return (
    <>
        <Navbar />
      <div className=" absolute w-full h-[120%] top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-black px-10">
        <div className="font-extrabold mb-5 pb-10">Monthly Expenses</div>
        <div className="flex flex-col justify-center items-center h-full ">
          <div className="mx-auto">
            <BarChartAnalyze/>
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

        
        <div>
          <div className="mt-8">
            <b>Expenses</b>
          </div>
          <div className="mt-6 border-2 border-black bg-slate-300">
            {allExpenses.map((name) => {
              return (
                <p className='p-2'>
                  ₹{name.amount} - {name.purpose} 
                </p>
              );
            })}
          </div>
          <div className='mt-2'></div>
        </div>
      </div>

    </>

  )
}

export default Analysis