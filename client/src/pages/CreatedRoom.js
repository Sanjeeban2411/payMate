import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { FaUserSecret } from "react-icons/fa";
import BarChart from "../components/BarChart";
import IndieExpenses from "../components/IndieExpenses";

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
  console.log('x',room)
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
        console.log(error)
        if (error.response.status === 401) {
          console.log("unauth")
          navigate(`/signin`)
        }
      });
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
      .catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          console.log("unauth")
          navigate(`/signin`)
        }
      });
  }, []);


  var listarray = userNames
  console.log("ls", listarray)
  // console.log("tst", userNames)
  var checkboxs = document.querySelectorAll('.checkbox')

  // for(var checkbox of checkboxs){
  //   checkbox.addEventListener('click',function(){
  //     for(let i=0;i<userNames.length;i++){
  //     if(userNames[i]==this.value){
  //       listarray = listarray.filter(e => e !== this.value)
  //       // listarray.push(this.value)
  //     }
  //     else if(userNames[i]!=this.value){
  //       listarray.push(this.value)

  //       // if(!listarray.includes(this.value)){
  //       //   listarray.push(this.value)
  //       // }
  //       // listarray = listarray.filter(e => e !== this.value)
  //       // console.log('you unchecked')
  //     }
  //   }
  //     // console.log("ck",this.checked)
  //     // console.log("st",listarray)
  //   })
  // }
  // console.log("arraylist",listarray)

  // const [check,setCheck]=useState(true)
  const addExpense = (e) => {
    e.preventDefault();

    // setSplitInto(arr)

    // setCheck('.checkbox'==true)
    console.log("e", e)

    if (amount <= 0) {
      setamount("")
      setpurpose("")
      return alert("You cannot enter 0 or negative amount")
    }
    // setCheck(true)

    // if (amount <= 0) {
    //   setamount("")
    //   setpurpose("")
    //   return alert("You cannot enter 0 or negative amount")
    // }
    // console.log("helloooooo", arr)
    axios({
      method: "post",
      url: `/${room}/addexpense`,
      data: {
        purpose: purpose,
        amount: Number(amount),
        splitInto: arr
      },
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        // getExp()
        setExpenseData({})
        setamount("")
        setpurpose("")
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          console.log("unauth")
          navigate(`/signin`)
        }
      });
  };

  console.log("splitinto", splitInto)

  // console.log("dataexp",roomName)
  console.log("users", allExpenses);

  const expenseDetails = (event, name) => {
    // let indieExpenses = []
    // allExpenses.forEach((e)=>{
    //   if(e.owner.name === name){
    //     indieExpenses.push(e)
    //   }
    // })
    // console.log("indie",indieExpenses)
    setIndie(true)
    setName(name.name)
  }

  // function onlyUnique(value, index, self) {
  //   return self.indexOf(value) === index;
  // }


  //   let sum
  //   let kharcha = []
  //   if(allExpenses.length>0){
  //   sum=allExpenses[0].amount
  //   console.log("amt",analyze[0].createdAt)
  //   for(let i=0;i<allExpenses.length-1;i++){
  //     console.log("test",analyze[i].createdAt,analyze[i].amount)
  //     console.log("test",analyze[i+1].createdAt,analyze[i+1].amount)
  //     if(allExpenses[i].owner.name===allExpenses[i+1].owner.name){
  //       sum=sum+allExpenses[i+1].amount
  //     }
  //     else{
  //       kharcha.push(sum)
  //       sum = allExpenses[i+1].amount
  //       kharcha.push(sum)
  //     }
  //   }
  //   kharcha.push(sum)
  // }
  // console.log("kkk",kharcha)
  // console.log("sm",sum)

  // const getval = (e) =>{
  //   const {value,checked}=e.target
  //   console.log(`${value} is ${checked}`)
  //   if(checked){
  //     setSplitInto([...splitInto, value])
  //   } else{
  //     setSplitInto(splitInto.filter((e)=> e!==value))
  //   }
  // }
  // const handlecheck((e)=>{
  //   console.log(e.target.value)
  // })



  // const handlcheck =(e)=>{
  //   let arr=[]
  //   for(var checkbox of checkboxs){
  //     if(e.target.checked==true){
  //       arr.push(e.target.value)
  //     }
  //     else{
  //       console.log("unchecked")
  //     }

  //   }
  //   console.log("listarr",arr)
  // }
  const [show,setShow]=useState(false)



  var arr = []
  for(let i=0; i<userNames.length; i++){
    arr.push(userNames[i]._id)
  }  

  const handleCheckbox = (e) => {
    const index = arr.indexOf(e.target.value)
    console.log("i", index)

    if (index > -1) {
      arr.splice(index, 1);
    }
    else {
      arr.push(e.target.value)
    }
    console.log("ARR", arr)
    // console.log("un", dup)
    // console.log("check", check)
  }


  return (
    <>
      <Navbar />
      <div className=" absolute w-full h-[120%] top-50% flex flex-col mt-20 font-Montserrat text-3xl  text-black px-10">
        <div className="flex flex-row">
        <div  className=" ml-14  text-right  object-cover"><img src="./assests/rooms-ava.png" className="mt-20 object-cover h-[80%] justify-center"/></div>
        <div className="flex flex-col justify-center items-center h-full ">
          <div className=" p-3  h-[75%] w-[100%] ml-6 box-border border-[4px] border-[#42BFEF] " id="crroom-bg"><div className=" font-extrabold ml-10 text-4xl">{roomName}</div>
            <div className="mx-10 bg-transparent my-14 md:my-6 ">
              <BarChart />
            </div>
          </div>
          </div>
          </div>
          <div className=" flex flex-row mx-20">
          <div className="max-w-[400px] border-[3px] border-[#42BFEF] rounded-[30px] mt-12 px-14  py-4  mr-6 ">
            <p className="  w-52 mx-auto  ">Add Expense</p>
            <div className=""><img src="./assests/hand-room.png" className="  mt-14 ml-14"/></div>
          </div>
          <div className="max-w-[1000px] mx-auto w-full  border-[3px] border-[#42BFEF] rounded-[30px] p-10 mt-12 ">
            <form className="max-w-[950px] mx-auto  p-3 mt-1">
              {/* <h2 className="text-4xl font-bold text-center py-6">
                ENTER YOUR EXPENSES
              </h2> */}
              <div className=" flex flex-col">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex  flex-col mb-4">
                  <label className="text-center text-[#2176AE]">Amount</label>
                  <input
                    className="relative border-b-2 border-black  p-2 w-[250px] mx-auto placeholder:text-black"
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
                  <label className="text-center text-[#2176AE]">Category</label>
                  <input
                    className="border-b-2 border-black relative placeholder:text-black  p-2 w-[250px] mx-auto"
                    type="text"
                    placeholder="🡇 Food"
                    onChange={(e) => {
                      setpurpose(e.target.value);
                    }}
                    value={purpose}
                  />
                </div>
                </div>
                <div className="mx-auto mt-4">
                  <label className="text-center text-[#2176AE]" onClick={()=>setShow(!show)}>Split With</label>
                  <br />
                  
                  {userNames.map((user, index) => {
                    return (
                     <div className="">
                         { show && (<div>
                          <input
                            type="checkbox"
                            defaultChecked="true"
                            id={user.name}
                            name={user.name}
                            value={user._id}
                            class="checkbox"
                            // onChange={handlcheck}
                            onClick={handleCheckbox}
                          />
                          <label for={user.name} style={{ fontSize: 35 }}>
                            {user.name}
                          </label>
                        </div>)
                    }
                      </div>
                    );
                    // console.log(e)
                  })}
                </div>
              
              <div>
              <button
                className="flex justify-center items-center bg-[#2176AE] mt-5 text-white mx-auto p-3 px-5  rounded-[20px] "
                onClick={addExpense}
              // onSubmit={()=> setChecked(true)}
              >
                Add Amount
              </button>
              </div>
              </div>
            </form>
          </div>
          </div>
        

        {/* {!indie &&
          <> */}
        <div className=" mt-32 md:mt-14 font-extrabold mx-auto text-4xl text-[#2176AE]">Mates</div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {userNames.map((name) => {
            return (
              <div className="flex flex-col border-[3px] border-[#42BFEF] rounded-[30px]">
                <div className="m-auto mt-4">
                  <FaUserSecret />
                </div>
                <div className="p-4 text-center">{name.name}</div>
                <button className="bg-[#2176AE] text-white mx-auto p-2 px-3 my-3 rounded-md" onClick={event => expenseDetails(event, name)}>
                  Expense Details
                </button>
              </div>
            );
          })}
        </div>
        {/* </>
        } */}
        {indie &&
          <>
            <IndieExpenses indie={indie} setIndie={setIndie} name={name} all={allExpenses} />
          </>
        }
        <button className="bg-[#2176AE] text-white mx-auto p-2 my-4 mt-10 rounded-md">
          <a href="/report" className="text-white no-underline">Settle Up</a>
        </button>
        <div className='border-2  my-24 mx-32 rounded-t-xl bg-white' id="tranbg">
                <div className="p-4 bg-[#E18A07] rounded-t-xl">
                  <h2 className='text-center'>Previous Transaction</h2>
                </div>
                <div className="mt-6  mx-20">
                  {/* {limit && pagination.reverse().map((name) => { */}
                  {limit && allExpenses.filter((name, idx) => idx < 5).map((names) => {
                    return (
                      <>
                        <div className=' p-2 flex justify-between'>
                          <div>
                          {names.owner.name}
                          </div>
                          <div>
                            {/* { names.room &&( {
                              return (
                                {names.room.name}
                              )
                            }
                            )
                            } */}
                            {/* <p>{names.rooms}</p> */}
                            {names.purpose}
                            {/* {new Date(name.updatedAt)} */}
                          </div>
                          <div>₹{names.amount}</div>
                        </div>
                        <hr className='' />
                      </>
                    );
                  })}

                  {!indie && !limit && allExpenses.map((name) => {
                    return (
                      <>
                        <div className=' p-2 flex justify-between'>
                          <div>
                            {name.owner.name}
                          </div>
                          <div className='p-2'>
                            {/* {name.rooms.map((names) => {
                  return (
                    <div className=''>
                      {names}
                    </div>
                  );
                })} */}

{name.purpose}
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
        {/* <div>
          <div className="mt-8">
            <b>Expenses</b>
          </div>
          {!indie &&
            <>
              <div className="mt-6 border-2 border-black bg-slate-300">
                {allExpenses.map((name) => {
                  return (
                    <p className='p-2'>
                      {name.owner.name}  ====  ₹{name.amount} - {name.purpose}
                    </p>
                  );
                })}
              </div>
            </>
          }
          <div className='mt-2'></div>
        </div> */}
      </div>
    </>
  );
};

export default CreatedRoom;
