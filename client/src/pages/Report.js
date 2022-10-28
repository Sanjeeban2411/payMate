import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "../components/Navbar";
import { HiUserCircle } from "react-icons/hi";

export default function Report() {
  const [totalData, setTotalData] = useState([]);
  const [check, setCheck] = useState(false);

  const navigate = useNavigate();

  console.log("tot", totalData);
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
      })
      // .then(() => {report()})
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          console.log("unauth");
          navigate(`/signin`);
        }
        // console.log("unauth")
      });
  }, [0]);

  console.log("token", x);

  // const report = ()=>{

  let lenden = [];
  // let totAmount = 0;
  let transactions = [];

  // totalData.forEach((amount) => {
  //   totAmount += amount.total;
  // });

  totalData.forEach((e) => {
    let tran = {
      user: e.user.name,
      // amount: e.total - totAmount / totalData.length,
      amount: e.total - e.dues,
      status: " ", //pay or recieve
      transact: [], //transaction with
      _id: e._id,
      token: e.user.token,
    };
    transactions.push(tran);
  });
  console.log("xy", transactions);

  transactions.forEach((tran) => {
    lenden.push(tran.amount);
  });

  // const lenden = [625, 125, -375, -375]
  console.log("lenden", lenden);
  function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }

  function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
  }

  let max = getMaxOfArray(lenden);
  let min = getMinOfArray(lenden);

  console.log(max, min);

  let count;
  while (count !== lenden.length) {
    // console.log("test", max)
    // console.log("arr", lenden)
    // console.log("tt", lenden[lenden.indexOf(max)])
    if (lenden.length > 0 && max !== 0 && min !== 0) {
      transactions[lenden.indexOf(max)].status = "recieve";
      transactions[lenden.indexOf(min)].status = "pay";

      // max = getMaxOfArray(lenden)
      // min = getMinOfArray(lenden)

      let tran = {
        user: transactions[lenden.indexOf(min)].user,
        amount: max + min < 0 ? max : min,
        _id: transactions[lenden.indexOf(min)]._id,
        token: transactions[lenden.indexOf(min)].token,
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

  function compare(a, b) {
    if (a.status < b.status) {
      return -1;
    }
    if (a.status > b.status) {
      return 1;
    }
    return 0;
  }

  transactions.sort(compare);
  // transactions.sort( compare ).reverse();

  console.log("new", transactions);
  // }

  //   FINAL DATA : transactions

  // if (transactions.length > 0) {
  //   console.log("arr->arr", transactions[0].transact[0].user);
  // }

  const handleClear = (event, parent, child) => {
    // console.log(event);
    console.log(parent._id);
    console.log(child._id);

    axios({
      method: "patch",
      url: `/${room}/settleTransaction`,
      headers: {
        Authorization: `Bearer ${x}`,
      },
      //   data: data,
      data: {
        payer: child._id,
        receiver: parent._id,
        amount: child.amount,
      },
    })
      .then((response) => {
        // localStorage.setItem("jwt_token", response.data.user.token);
        // navigate("/user");
        // console.log(".then",data)
        console.log(response);
        window.location.reload();
        // clearTotal()
        // console.log(response.data.user.token);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          console.log("unauth");
          navigate(`/signin`);
        }
        // console.log("unauth")
      });

    console.log("after", transactions);
  };
  console.log("after", transactions);

  // let countDone = 0
  // transactions.forEach((e) => {
  //   if (e.amount === 0) {
  //     countDone += 1
  //   }
  // })
  // console.log(countDone)
  // console.log(transactions.length)

  // const handleClear = () => {

  // }

  // const clearTotal = () => {
  //   let countDone = 0;
  //   transactions.forEach((e) => {
  //     if (e.amount === 0) {
  //       countDone += 1;
  //     }
  //   });
  //   console.log("fnc");
  //   console.log(countDone);
  //   console.log(transactions.length);

  //   if (countDone === transactions.length) {
  //     axios({
  //       method: "patch",
  //       url: `/${room}/settleTransaction`,
  //       headers: {
  //         Authorization: `Bearer ${x}`,
  //       },
  //       //   data: data,
  //       data: {
  //         command: "settleAllTransactions(aDmin)",
  //       },
  //     })
  //       .then((response) => {
  //         // localStorage.setItem("jwt_token", response.data.user.token);
  //         // navigate("/user");
  //         // console.log(".then",data)
  //         console.log(response);
  //         // window.location.reload()
  //         // console.log(response.data.user.token);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         if (error.response.status === 401) {
  //           console.log("unauth");
  //           navigate(`/signin`);
  //         }
  //         // console.log("unauth")
  //       });
  //   }
  // };

  const [qr, setqr] = useState("");

  console.log("x", x);
  return (
    <>
      <Navbar />
      {/* {totalData} */}
      <div className=" absolute w-full h-[120%] top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-black px-10">
        <div className="font-extrabold mb-5 pb-10">
          <div className=" text-center text-4xl font-extrabold mb-2">Settle</div>
          
          {transactions.map((name) => {
            return (
              <div className="mr-auto">
              <div
                className={
                  name.status === "pay"
                    ? " hidden"
                    : name.status === "recieve"
                    ? " flex flex-row text-center mb-2"
                    : "hidden"
                }
              >
                <div className="w-[380px] h-[270px] rounded-l-[20px] border-2 border-y-[#2176AE] border-l-[#2176AE]">
                  <div className="flex flex-col py-3">
                  <div className="">
                    <HiUserCircle size={100} className="mx-auto" />
                  </div>
                  <div className=" font-bold">{name.user}</div>
                  <div className=" text-lg">has to {name.status}</div>
                  <div className=" text-2xl">₹{Math.abs(name.amount.toFixed(2))}</div>
                  </div>
                </div>
                <div id="settle-card-bg" className="flex flex-col flex-wrap w-[900px] h-[270px]">
                  <hr className=" absolute bottom-10 left-20"/>
                {name.transact.map((names) => {
                  return (
                    
                    <div className="relative pl-5 pr-2 m-auto text-[#2176AE] font-extrabold flex flex-col">
                      <div className="flex flex-row">
                      <div>
                      <HiUserCircle size={70} color="black" className="mx-auto" />
                      </div>
                      <div className="flex flex-col mt-2 ml-3">
                      <div className=" text-xl text-black">{names.user}</div>
                      <div className=" text-xl">₹{Math.abs(names.amount.toFixed(2))}</div>
                      </div>
                      </div>
                      {/* <span className="w-2"><img src="/assests/down.png" alt="" className=""/></span> */}
                      
                      {/* <div className={names.token === x ? "block" : "hidden"}>
                        <button className="bg-black text-white">pay</button>
                      </div> */}
                      <div className={name.token === x ? "block" : "hidden"}>
                        <button
                          className="bg-white text-black duration-500 py-2 px-2 rounded-[15px] text-xs hover:bg-green-400 m-3"
                          onClick={(event) => handleClear(event, name, names)}
                        >
                          Mark as Paid
                        </button>

                        <button
                          className="bg-[#2176AE] text-white text-xs py-2 px-3 rounded-[15px] font-semibold"
                          onClick={() => {
                            setqr(names.user);
                            // setqr(false)
                            // console.log(qr)
                          }}
                        >
                          Generate QR
                        </button>
                        {qr === names.user && (
                          <QRCodeSVG
                            value={`upi://pay?pa=sanju.sanjeeban.sp@oksbi&pn=Sanjeeban&am=${Math.abs(
                              names.amount
                            )}&cu=INR`}
                          />
                        )}
                      </div>
                    </div>
                    
                  );
                })}
                </div>
              </div>
              </div>
            );
          })}
          

          {/* <span className={countDone === transactions.length ? 'block' : 'hidden'}>
            <button className="bg-black text-white px-10 py-2" onClick={handleClear}>
              Clear
            </button>
          </span> */}
        </div>
      </div>
    </>
  );
}
