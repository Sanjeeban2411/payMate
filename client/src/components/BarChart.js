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

  useEffect(() => {
    axios({
      method: "get",
      url: `/${room}/analyze`,
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


  return (
    <div>
      <Chart
      type="bar"
      width={1100}
      height={500}

      series={[{
        name: "Expenses",
        data: tt
        
      }]}
      options={{
        title:{text:"Expense Chart",style:{fontSize:25}},
        colors: ['#0C090A'],
        theme:{mode:'light'},
        xaxis:{
          labels:{style:{fontSize:17}},
          categories: userNames,
          title:{text:'Members',style:{fontSize:25}}
        },
        yaxis:{
          labels:{formatter:(val)=>{return `₹${val}`},style:{fontSize:17}},
          title:{text:'Expenses',style:{fontSize:25}}
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