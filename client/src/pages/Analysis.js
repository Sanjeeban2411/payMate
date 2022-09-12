import React, {useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import axios, { Axios } from "axios";
// import BarChart from '../components/BarChart'
import BarChartAnalyze from '../components/BarChartAnalyze';
import BarChartWeek from '../components/BarChartWeek';

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


  function monthname(num) {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return months[num-1];
    }
    function weekname(value){
      let week = ["Week-1","Week-2","Week-3","Week-4"];
      return week[value-1];
    }
  const date=allExpenses.map((totl)=>{
    return(
      monthname(totl.updatedAt.slice(6,7))
    );
   })
   const weekdata=allExpenses.map((tot)=>{
    return(
      // console.log("ccc",tot.updatedAt.slice(9,10))
      weekname(Math.ceil((tot.updatedAt.slice(8,10))/7))
    );
   })
   console.log("weeknam",weekdata)
  //  console.log("date",date)
  // date[3]="September"
  // date[4]="September"
  // date[5]="October"
   console.log("month",date)

  //  console.log("m-w",weekdata[0].concat("-",date[0]))
   let analyze=allExpenses

  if(analyze.length>0){
    for(let i=0;i<analyze.length;i++){
      analyze[i].createdAt=date[i];
      
   }
   console.log("arr",analyze)
  }

   console.log("analyze",analyze)

   let weeks=allExpenses

  if(weeks.length>0){
    for(let i=0;i<weeks.length;i++){
      weeks[i].createdAt=weekdata[i].concat("/",date[i]);
      
   }
   console.log("wname",weeks)
  }

   console.log("analyze",analyze)

   let w_m=[]

   if(allExpenses.length>0){
    for(let i=0;i<allExpenses.length;i++){
      w_m[i]=weekdata[i].concat("/",date[i]);
    }
    console.log("w__m",w_m);
   }

   function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const Month=date.filter(onlyUnique)
  console.log("data",Month)
  const weedata=w_m.filter(onlyUnique)
  console.log("www",weedata)

  // let tamt=([])
  let sum
  let kharcha = []
  if(analyze.length>0){
  sum=analyze[0].amount
  // console.log("amt",analyze[0].createdAt)
  for(let i=0;i<analyze.length-1;i++){
    // console.log("test",analyze[i].createdAt,analyze[i].amount)
    // console.log("test",analyze[i+1].createdAt,analyze[i+1].amount)
    if(analyze[i].createdAt===analyze[i+1].createdAt){
      sum=sum+analyze[i+1].amount
    }
    else{
      kharcha.push(sum)
      sum = analyze[i+1].amount
      // kharcha.push(sum)
    }
  }
  kharcha.push(sum)
}
  console.log("sm",sum)
  console.log("y axis",kharcha)

// week amt

let weeksum
  let weekkharcha = []
  if(weeks.length>0){
  weeksum=weeks[0].amount
  console.log("amt",weeks[0].createdAt)
  for(let i=0;i<weeks.length-1;i++){
    console.log("weektest",weeks[i].createdAt,weeks[i].amount)
    console.log("weektesttest",weeks[i+1].createdAt,weeks[i+1].amount)
    if(weeks[i].createdAt===weeks[i+1].createdAt){
      weeksum=weeksum+weeks[i+1].amount
    }
    else{
      weekkharcha.push(weeksum)
      weeksum = weeks[i+1].amount
      // kharcha.push(sum)
    }
  }
  weekkharcha.push(sum)
}
  console.log("sm-week",weeksum)
  console.log("y axis week",weekkharcha)



  //  const monthName=months[date.getMonth()];
  //  console.log("month",monthName)
  // console.log("data",data)
  // console.log("expensedata",expenseData)
  // console.log("allexpense",allExpenses)


  return (
    <>
        <Navbar />
      <div className=" absolute w-full h-[120%] top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-black px-10">
        <div className="font-extrabold mb-5 pb-10">Monthly Expenses</div>
        <div className="flex flex-col justify-center items-center h-full ">
          <div className="mx-auto">
            <BarChartAnalyze/>
            <BarChartWeek/>
          </div>
          {/* <BarChart/> */}
          <div className='max-w-[1150px] mx-auto w-full rounded-md border-2 border-black p-3 mt-12'>
          <form className="max-w-[1100px] mx-auto w-full rounded-md border-2 border-black p-8 mt-2">
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
          </form>
          </div>
        </div>

        
        <div>
          <div className=" mt-32 md:mt-14">
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