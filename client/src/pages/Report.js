import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "../components/Navbar";

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

  const clearTotal = () => {
    let countDone = 0;
    transactions.forEach((e) => {
      if (e.amount === 0) {
        countDone += 1;
      }
    });
    console.log("fnc");
    console.log(countDone);
    console.log(transactions.length);

    if (countDone === transactions.length) {
      axios({
        method: "patch",
        url: `/${room}/settleTransaction`,
        headers: {
          Authorization: `Bearer ${x}`,
        },
        //   data: data,
        data: {
          command: "settleAllTransactions(aDmin)",
        },
      })
        .then((response) => {
          // localStorage.setItem("jwt_token", response.data.user.token);
          // navigate("/user");
          // console.log(".then",data)
          console.log(response);
          // window.location.reload()
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
    }
  };

  const [qr, setqr] = useState("");

  console.log("x", x);
  return (
    <>
      <Navbar />
      {/* {totalData} */}
      <div className=" absolute w-full h-[120%] top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-black px-10">
        <div className="font-extrabold mb-5 pb-10">
          <div className=" text-center text-4xl font-extrabold">Settle</div>
          {transactions.map((name) => {
            return (
              <div
                className={
                  name.status === "pay" ? "bg-yellow-200 pl-10" : "bg-blue-400"
                }
              >
                <div className="ml-5">
                  {name.user} has to {name.status} <span>&#10230;</span> ₹
                  {Math.abs(name.amount.toFixed(2))}
                </div>
                {name.transact.map((names) => {
                  return (
                    <div className=" bg-slate-200 pl-40 text-[#2176AE] font-extrabold">
                      {names.user} -- ₹{Math.abs(names.amount.toFixed(2))}
                      <span className={names.token === x ? "block" : "hidden"}>
                        <button className="bg-black text-white">pay</button>
                      </span>
                      <span className={name.token === x ? "block" : "hidden"}>
                        <button
                          className="bg-green-600 text-white duration-500 py-2 px-4 rounded-[15px] hover:bg-green-400 m-3"
                          onClick={(event) => handleClear(event, name, names)}
                        >
                          Mark as Paid
                        </button>

                        <button
                          className="bg-[#2176AE] text-white py-2 px-4 rounded-[15px] font-semibold"
                          onClick={() => {
                            setqr(names.user);
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
                      </span>
                    </div>
                  );
                })}
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
