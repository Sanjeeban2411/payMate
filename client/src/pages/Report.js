import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function RoomAnalysis() {
  const [totalData, setTotalData] = useState([]);

  const x = localStorage.getItem("jwt_token");
  const room = localStorage.getItem("room");

  useEffect(() => {
    axios({
      method: "get",
      url: `/${room}/analyze`,
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        setTotalData(response.data.total);
        console.log("total", response.data);
        // report()
      })
      // .then(() => {report()})
      .catch((error) => console.log(error));
  }, [0]);

  // const report = ()=>{

  let lenden = [];
  let totAmount = 0;
  let transactions = [];

  totalData.forEach((amount) => {
    // total.push(amount.total)
    totAmount += amount.total;
  });

  totalData.forEach((e) => {
    let tran = {
      user: e.user.name,
      amount: e.total - totAmount / totalData.length,
      status: " ", //pay or recieve
      transact: [], //transaction with
    };
    transactions.push(tran);
  });

  transactions.forEach((tran) => {
    lenden.push(tran.amount);
  });

  // const lenden = [625, 125, -375, -375]
  console.log(lenden);
  function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }

  function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
  }

  let max = getMaxOfArray(lenden);
  let min = getMinOfArray(lenden);

  // console.log(max, min)

  let count;
  while (count !== lenden.length) {
    // console.log("test", max)
    // console.log("arr", lenden)
    // console.log("tt", lenden[lenden.indexOf(max)])
    if (lenden.length > 0) {
      transactions[lenden.indexOf(max)].status = "recieve";
      transactions[lenden.indexOf(min)].status = "pay";

      // max = getMaxOfArray(lenden)
      // min = getMinOfArray(lenden)

      let tran = {
        user: transactions[lenden.indexOf(min)].user,
        amount: max + min < 0 ? max : min,
      };
      transactions[lenden.indexOf(max)].transact.push(tran);
      lenden[lenden.indexOf(max)] = max + min > 0 ? max + min : 0;
      lenden[lenden.indexOf(min)] = max + min < 0 ? max + min : 0;
      // console.log(max+min)
      // console.log(lenden)
      // console.log("test",totalData[lenden.indexOf(max)])
    }
    max = getMaxOfArray(lenden);
    min = getMinOfArray(lenden);
    console.log(max, min);
    // count = lenden.filter(x => x < lenden.length).length
    count = lenden.filter((x) => x < 1).length;
  }

  console.log("data", lenden);
  // console.log(totAmount)

  // transactions.forEach((e)=>{
  //   e.amount.toPrecision(2)
  //   console.log(e)
  // })

  function compare( a, b ) {
    if ( a.status < b.status ){
      return -1;
    }
    if ( a.status > b.status ){
      return 1;
    }
    return 0;
  }
  
  transactions.sort( compare );  
  // transactions.sort( compare ).reverse();  

  console.log("new", transactions);
  // }

  //   FINAL DATA : transactions
  // if (transactions.length > 0) {
  //   console.log("arr->arr", transactions[0].transact[0].user);
  // }
  return (
    <>
      <Navbar />
      {/* {totalData} */}
      <div className=" absolute w-full h-[120%] top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-black px-10">
        <div className="font-extrabold mb-5 pb-10">
          {transactions.map((name) => {
            return (
              <p className={name.status === 'pay' ? 'bg-yellow-200 pl-10' : 'bg-slate-200'}>
                {name.user} has to {name.status} ₹{Math.abs((name.amount).toFixed(2))}
                {name.transact.map((names) => {
                  return (
                    <div className=' bg-slate-400 pl-40'>
                      {names.user} -- ₹{Math.abs((names.amount).toFixed(2))}
                    </div>
                  );
                })}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}
