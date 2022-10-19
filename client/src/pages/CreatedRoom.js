import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { HiUserCircle } from "react-icons/hi";
import BarChart from "../components/BarChart";
import IndieExpenses from "../components/IndieExpenses";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatedRoom = () => {
  const [purpose, setpurpose] = useState();
  const [amount, setamount] = useState();
  const [limit, setLimit] = useState(true);

  const [indie, setIndie] = useState(false);
  const [name, setName] = useState();

  const [roomName, setRoomName] = useState("");
  const [userNames, setUserNames] = useState([]);
  const [expenseData, setExpenseData] = useState({});
  const [allExpenses, setAllExpenses] = useState([]);

  const [splitInto, setSplitInto] = useState([]);

  let navigate = useNavigate();
  const x = localStorage.getItem("jwt_token");
  const room = localStorage.getItem("room");
  console.log("x", room);
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
        // setSplitInto(response.data.userNames)
        console.log("data", response.data);
        console.log("username", response.data.userNames);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          console.log("unauth");
          navigate(`/signin`);
        }
      });
  }, [0]);


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
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          console.log("unauth");
          navigate(`/signin`);
        }
      });
  }, []);

  var listarray = userNames;
  console.log("ls", listarray);
  // console.log("tst", userNames)
  var checkboxs = document.querySelectorAll(".checkbox");

  const [isActive, setIsActive] = useState(false);

  const addExpense = (e) => {
    // e.preventDefault();

    // setSplitInto(arr)

    // setCheck('.checkbox'==true)
    

    toast.success('Successfully Added !', {
      position: toast.POSITION.TOP_RIGHT
    });

    console.log("e", e);

    if (amount <= 0) {
      setamount("");
      setpurpose("");
      return alert("You cannot enter 0 or negative amount");
    }

    axios({
      method: "post",
      url: `/${room}/addexpense`,
      data: {
        purpose: purpose,
        amount: Number(amount),
        splitInto: arr,
      },
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        // getExp()
        setExpenseData({});
        setamount("");
        setpurpose("");
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

  console.log("splitinto", splitInto);

  console.log("users", allExpenses);

  const expenseDetails = (event, name) => {

    setIndie(true);
    setName(name.name);
    setIsActive(current => !current);
  };


  const [show, setShow] = useState(false);

  var arr = [];
  for (let i = 0; i < userNames.length; i++) {
    arr.push(userNames[i]._id);
  }

  const handleCheckbox = (e) => {
    const index = arr.indexOf(e.target.value);
    console.log("i", index);

    if (index > -1) {
      arr.splice(index, 1);
    } else {
      arr.push(e.target.value);
    }
    console.log("ARR", arr);
    // console.log("un", dup)
    // console.log("check", check)
  };

  // const [owner, setOwner] = useState("");
  let owner
  const leaveRoom = () => {
    if (userNames.length > 0) {
      console.log("UN", userNames)
      userNames.forEach((user) => {
        if (user.token === x) {
          console.log("UNSERS", user)
          // setOwner(user._id.toString())
          owner = user._id.toString()
        }

      })
      console.log("yooyooo", owner)
    }

    if (owner) {
      axios({
        method: "patch",
        // url: `/${room}/leave/${owner}`,
        url: `/${room}/leaveroom`,
        headers: {
          Authorization: `Bearer ${x}`,
        },
        data: {
          user: owner
        }
      })
        .then((response) => {
          console.log(response)
          navigate(`/rooms`);
        })
        .catch((error) => {
          console.log(error);
          // if (error.response.status === 401) {
          //   console.log("unauth");
          //   navigate(`/signin`);
          // }
        });
    }

    // }
  }

  const handleDelete = (event, exp) => {
    console.log(exp)
    axios({
      method: "delete",
      url: `/deleteexpense/${exp._id}`,
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        console.log("done");
        // console.log(response)
        // setdata(response.data);
        // console.log("16", response.data)
      })
      .catch((error) => {
        console.log(error);
        // if (error.response.status === 401) {
        //   console.log("unauth");
        //   navigate(`/signin`);
        // }
      });
  }

  $("button").click(function(){
    $("button").removeClass("active-1");
    $(this).addClass("active-1");
  });

  return (
    <>
      <Navbar />
      <div className=" absolute w-full h-[120%] top-50% flex flex-col mt-20 font-Montserrat text-3xl  text-black px-10">
        <div className="flex flex-row">
          <div className=" ml-14  text-right  object-cover">
            <img
              src="./assests/rooms-ava.png"
              className="mt-20 object-cover h-[80%] justify-center"
            />
          </div>
          <div className="flex flex-col justify-center items-center h-full ">
            <div
              className=" p-3  h-[75%] w-[100%] ml-6 box-border border-[4px] border-[#42BFEF] "
              id="crroom-bg"
            >
              <div className=" font-extrabold ml-10 text-4xl">{roomName}</div>
              <div className="mx-10 bg-transparent my-14 md:my-6 ">
                <BarChart />
              </div>
            </div>
          </div>
        </div>

        <div>
          {
            userNames.length > 0 &&
            <button
              className="bg-black text-white"
              onClick={leaveRoom}
            >
              Leave Room
            </button>
          }
        </div>

        <div className=" flex flex-row mx-20">
          <div className="max-w-[400px] border-[3px] border-[#42BFEF] rounded-[30px] mt-12 px-14  py-4  mr-6 ">
            <p className="  w-52 mx-auto font-MinionPro text-4xl ">Add Expense</p>
            <div className="">
              <img src="./assests/hand-room.png" className="  mt-14 ml-14" />
            </div>
          </div>
          <div className="max-w-[1000px] mx-auto w-full  border-[3px] border-[#42BFEF] rounded-[30px] p-10 mt-12 ">
            <form className="max-w-[950px] mx-auto  p-3 mt-1">
              <div className=" flex flex-col">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex  flex-col mb-4">
                    <label className="text-center text-[#2176AE] font-MinionPro text-4xl">Amount</label>
                    <input
                      className="relative border-b-2 border-black  p-2 w-[190px] mx-auto placeholder:text-black"
                      type="number"
                      min={0}
                      placeholder="₹"
                      onChange={(e) => {
                        setamount(e.target.value);
                      }}
                      value={amount}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="text-center text-[#2176AE] font-MinionPro text-4xl">
                      Category
                    </label>
                    <input
                      className="border-b-2 border-black relative placeholder:text-black  p-2 w-[190px] mx-auto"
                      type="text"
                      placeholder="🢓 Food"
                      onChange={(e) => {
                        setpurpose(e.target.value);
                      }}
                      value={purpose}
                    />
                  </div>
                </div>
                <div className="mx-auto mt-4">
                  <div className="mx-auto">
                    <label
                      className="text-center text-black bg-[#9FD7FC] rounded-[13px] px-3 py-2 font-MinionPro"
                      onClick={() => setShow(!show)}
                    >
                      Split With
                    </label></div>
                  <div className="rounded-[8px] mx-auto px-2 py-1" id="split-bg">
                    {userNames.map((user, index) => {
                      return (
                        <div className=" ">
                          {show && (
                            <div>
                              <div className=" flex flex-row  ">
                                <div className=" ">
                                  <input
                                    type="checkbox"
                                    defaultChecked="true"
                                    id={user.name}
                                    name={user.name}
                                    value={user._id}
                                    class="checkbox"
                                    onClick={handleCheckbox}
                                  /></div>
                                <div className=" text-center mx-auto">
                                  <label for={user.name} style={{ fontSize: 35 }} className=" font-MinionPro">
                                    {user.name}
                                  </label>
                                </div>

                              </div><hr /></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <button
                    className="flex justify-center items-center bg-[#2176AE] mt-5 text-white mx-auto p-3 px-5 font-MinionPro text-4xl  rounded-[20px] "
                    onClick={addExpense}
                  >
                    Add Amount
                  </button>
                  <ToastContainer />
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* <div className=" bg-[#C6E9FF]  absolute h-[350px] w-[1440px] top-[900px]"></div> */}
        <div className=" mt-32 md:mt-14 font-extrabold mx-auto text-4xl text-[#2176AE]">
          Mates
        </div>

        <div id="card-room"  className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {userNames.map((name) => {
            return (
              // <div  className="flex flex-col    bg-[#2176AE] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-500 " id="cr-card">
                <div   className="flex flex-col  bg-[#2176AE] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-500" id="cr-card">
                <div className=" border-2 border-black m-3 bg-[#E9F1F7]">
                  <div className=" mt-4">
                    <HiUserCircle size={200} className=" mx-auto " />
                  </div>
                  <div className="p-4 text-center font-MinionPro text-4xl">{name.name}</div>
                </div>
                <button
                id="button"
                  className="bg-[#E9F1F7] text-[#2176AE] text-2xl   hover:text-white mx-auto p-2 px-4 my-3 rounded-md transition ease-in-out hover:-translate-y-1 hover:scale-110  duration-500"
                  onClick={(event) => expenseDetails(event, name)}
                  // style={{
                  //   backgroundColor: isActive ? 'black' : '',
                  //   color: isActive ? 'white' : '',
                  // }}
                >
                  Spent
                </button>
              </div>
            );
          })}
        </div>
        {/* </>
        } */}
        {indie && (
          <>
            <IndieExpenses
              indie={indie}
              setIndie={setIndie}
              name={name}
              all={allExpenses}
            />
          </>
        )}
        <button className="bg-[#2176AE] text-white mx-auto p-2 my-4 mt-10 rounded-md transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-500">
          <a href="/report" className="text-white no-underline">
            Settle Up
          </a>
        </button>
        {!indie &&
        <div
          className="border-2  my-24 mx-32 rounded-t-xl bg-white"
          id="tranbg"
        >
          <div className="p-4 bg-[#E18A07] rounded-t-xl">
            <h2 className="text-center">Previous Transaction</h2>
          </div>
          <div className="mt-6">
            { 
              allExpenses.filter((name, idx) => {
                return (limit ? idx < 5 : name)
              })
                .map((names) => {
                return (
                  <>
                    <div className=" p-2 grid grid-cols-3 gap-4">
                      <div className="  text-center">{names.owner.name}</div>
                      <div className=" text-center">
                        {names.purpose}
                      </div>
                      <div className=" text-center">
                        ₹{names.amount}
                        <button
                          className="bg-black text-red-300"
                          onClick={(event) => handleDelete(event, names)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                    <hr className="mx-16 " />
                  </>
                );
              })}

            <div className=" text-center">
              <button
                onClick={() => setLimit(!limit)}
                className=" border-[3px] rounded-[10px] border-black py-2 px-3"
              >
                {limit ? "Show more" : "Show less"}
              </button>
            </div>
          </div>
        </div>}
      </div>
    </>
  );
};

export default CreatedRoom;
