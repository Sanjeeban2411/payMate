import React, { useState, useEffect } from "react";
import Chart from 'react-apexcharts'
import axios from "axios";

const BarChart = () => {

//   const [purpose, setpurpose] = useState();
  const [total, setTotal] = useState([]);

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
      url: `https://paymate-back.onrender.com/${room}/users`,
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
      url: `https://paymate-back.onrender.com/${room}/getexpenses`,
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

  useEffect(() => {
    axios({
      method: "get",
      url: `https://paymate-back.onrender.com/${room}/analyze`,
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        setTotal(response.data.total);
        console.log("tot", response.data.total);
      })
      .catch((error) => console.log(error));
  }, []);
  
   console.log("user", userNames);
   console.log("amount",allExpenses)
   console.log("total",total)

   const tt=total.map((totl)=>{
    return(
      totl.total
    );
   })
   console.log("ovtotal",tt)
   

   var arr=[]
   for(let i=0;i<userNames.length;i++){
    arr[i]=userNames[i].name
   }
   console.log("ovtotal-user",arr)

   var items=allExpenses

   let ab = items.reduce(function (c, x) {
    if (!c[x.owner.name])
      c[x.owner.name] = {
        name: x.owner.name,
        total: 0,
      }
    c[x.owner.name].total += Number(x.amount)
    return c
  }, [])
  let output = []
let totalSum = 0

for (const name in ab) {
  let temp = {
    name: ab[name].name,
    total: ab[name].total,
  }
  totalSum = totalSum + ab[name].total
  output.push(temp)
}

  console.log("total-user-amt",output)
  let usertot=[]
  for(let i=0;i<output.length;i++){
    usertot[i]=output[i].total
  }
  console.log("user-total",usertot)
  let user=[]
  for(let i=0;i<output.length;i++){
    user[i]=output[i].name
  }
  console.log("user",user)

  


  return (
    <div>
      <Chart
      type="bar"
      width={900}
      height={400}

      series={[{
        name: "Expenses",
        data: usertot
        
      }]}
      options={{
        title:{text:"",style:{fontSize:25}},
        colors: ['#02A9EA','#0C090A'],
        plotOptions: {
          bar: {
            distributed: true
          }
        }  ,
        theme:{mode:'light'},
        xaxis:{
          labels:{style:{fontSize:17}},
          categories: user,
          title:{text:'',style:{fontSize:25}}
        },
        yaxis:{
          // labels:none,
          show: false,
          title:{text:'',style:{fontSize:25}}
        },
        dataLabels:{
          formatter:(val)=>{return `₹${val}`}
        }
        
      }}
      
      >

      </Chart>
    </div>
  )
}

export default BarChart