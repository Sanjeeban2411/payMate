import React, { useState } from "react";
import { AiOutlineMore, AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ExpenseLog(props) {
  const x = localStorage.getItem("jwt_token");
  let navigate = useNavigate();

  const [showOp, setShowOp] = useState({
    id: "",
    status: false,
  });

  const [detail, setDetail] = useState({});

  const handleDetail = (event, exp) => {
    console.log(exp);
    axios({
      method: "get",
      url: `https://paymate-back.onrender.com/detailedexpense/${exp._id}`,
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        setDetail(response.data);
        console.log("detail", response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          console.log("unauth");
          navigate(`/signin`);
        }
      });
  };

  const handleDelete = (event, exp) => {
    console.log(exp);
    axios({
      method: "delete",
      url: `https://paymate-back.onrender.com/deleteexpense/${exp._id}`,
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        console.log("done");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          console.log("unauth");
          navigate(`/signin`);
        }
      });
  };

  // const handleEdit = (event, exp) => {
  //   console.log(exp);

  // };

  const [editMode, setEditMode] = useState({
    details: {},
    status: false,
  });

  const [editAmount, setEditAmount] = useState(false);
  const [editPurpose, setEditPurpose] = useState(false);
  const [purpose, setPurpose] = useState(" ");
  const [amount, setAmount] = useState();

  const [editedData, setEditedData] = useState({
    pupose: editMode.purpose,
    amount: editMode.amount,
    splitInto: [],
  });

  const [splitInto, setSplitInto] = useState([]);
  const [memsplit,setMemsplit] = useState([])
  const [remaining, setRemaining] = useState([]);
  const [user, setUser] = useState();

  const [add, setAdd] = useState(false);
  let ss = [];

  return (
    <div className="border-2  my-24 mx-32 rounded-t-xl bg-white" id="tranbg">
      {!editMode.status && (
        <>
          <div className="p-4 bg-[#E18A07] rounded-t-xl">
            <h2 className="text-center">Previous Transaction</h2>
          </div>
          <div className="mt-6">
            {props.all
              .filter((name, idx) => {
                return props.limit ? idx < 5 : name;
              })
              .map((names, index) => {
                return (
                  <>
                    <div className=" p-2 grid grid-cols-3 gap-4">
                      <div className="text-center">{names.owner.name}</div>
                      <div className="text-center">{names.purpose}</div>
                      <div className="text-center">
                        ₹{names.amount}
                        <button
                          className=""
                          onClick={() => {
                            setShowOp({
                              id: `${names._id}`,
                              status: !showOp.status,
                            });
                            let splituser = [];
                            for (let i = 0; i < names.splitInto.length; i++) {
                              splituser[i] = names.splitInto[i]._id;
                            }
                            console.log("ssss", splituser);

                            const rem = props.users.filter(
                              (user) => !splituser.includes(user._id)
                            );

                            console.log("rem", rem);
                            setRemaining(rem);
                            setUser(index);
                            setSplitInto(names.splitInto);

                            ss = props.all[index];
                            console.log("state", remaining);
                            console.log("OP", showOp);
                          }}
                        >
                          <AiOutlineMore style={{ marginLeft: "20px" }} />
                        </button>
                        {showOp.status && showOp.id === names._id && (
                          <div className="flex flex-col">
                            <button
                              className="bg-black text-white"
                              onClick={() => {
                                setEditMode({
                                  details: names,
                                  status: true,
                                });
                                // setSplitInto(names.splitInto);
                                // setRems(names)
                                // ss = props.all[user]
                                console.log("state", editMode);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-black text-white"
                              onClick={(event) => handleDetail(event, names)}
                            >
                              Details
                            </button>
                            <button
                              className="bg-black text-white"
                              onClick={(event) => handleDelete(event, names)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <hr className="mx-16 " />
                  </>
                );
              })}
            <div className=" text-center">
              <button
                onClick={() => props.setLimit(!props.limit)}
                className=" border-[3px] rounded-[10px] border-black py-2 px-3"
              >
                {props.limit ? "Show more" : "Show less"}
              </button>
            </div>
          </div>
        </>
      )}
      {editMode.status && (
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-36 p-2 ">
            <div className="flex flex-row">
              <span
                onClick={() => {
                  setEditPurpose(true);
                  setPurpose(editMode.details.purpose);
                }}
              >
                <MdOutlineEdit />
              </span>
              {!editPurpose && <div>{editMode.details.purpose}</div>}
              {editPurpose && (
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => {
                    setPurpose(e.target.value);
                  }}
                />
              )}
            </div>
            <div className="flex flex-row">
              <span
                onClick={() => {
                  setEditAmount(true);
                  setAmount(editMode.details.amount);
                }}
              >
                <MdOutlineEdit />
              </span>
              <span>₹</span>
              {!editAmount && <div>{editMode.details.amount}</div>}
              {editAmount && (
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              )}
              <span
                className=" text-red-600 mx-10"
                onClick={() => {
                  setEditMode({
                    details: {},
                    status: false,
                  });
                  setEditPurpose(false);
                  setEditAmount(false);
                  setPurpose(" ");
                  setAmount();

                  setSplitInto(props.all[user].splitInto);
                  let splituser = [];
                  for (let i = 0; i < props.all[user].splitInto.length; i++) {
                    splituser[i] = props.all[user].splitInto[i]._id;
                  }
                  const rem = props.users.filter(
                    (user) => !splituser.includes(user._id)
                  );
                  setRemaining(rem);
                  // console.log("close", props.all[user]);
                  console.log("close", ss);
                }}
              >
                x
              </span>
              <span
                onClick={() => {
                  let splitArr = [];
                  editMode.details.splitInto.forEach((e) => {
                    splitArr.push(e._id);
                  });
                  setEditedData({
                    purpose: editPurpose ? purpose : editMode.details.purpose,
                    amount: editAmount ? amount : editMode.details.amount,
                    splitInto: splitArr,
                  });
                  console.log("done", editedData);
                }}
              >
                V
              </span>
            </div>
          </div>
          <div className=" text-[#02A9EA]">
            Split With &rarr;
            <div className=" flex flex-row">
              {splitInto.map((split) => {
                return (
                  <div className="px-4 py-2 m-2 bg-[#2176AE] text-white rounded-[15px] ">
                    {split.name}
                    <span
                      className="text-white ml-4 font-thin "
                      onClick={() => {
                        let detail = editMode.details;
                        detail.splitInto = editMode.details.splitInto.filter(
                          (e) => e._id !== split._id
                        );
                        // setEditedData(editedData.splitInto.filter((e)=>{return(e!==split.name)}))
                        // setEditMode({details:{splitInto:editMode.details.splitInto.filter((e)=>e._id!==split._id)}})
                        setEditMode({
                          details: {
                            purpose: editPurpose
                              ? purpose
                              : editMode.details.purpose,
                            amount: editAmount
                              ? amount
                              : editMode.details.amount,
                            splitInto: detail.splitInto,
                          },
                          status: true,
                        });
                        setSplitInto(detail.splitInto);
                        let newArr = remaining;
                        // setRems(
                        newArr.push({
                          name: split.name,
                          _id: split._id,
                          token: split.token,
                        });
                        // );
                        console.log("delete", newArr);
                      }}
                    >
                      x
                    </span>
                  </div>
                );
              })}
              {props.users.length !== editMode.details.splitInto.length && (
                <div>
                  <AiFillPlusCircle
                    size={70}
                    onClick={() => {
                      setAdd(!add);
                    }}
                  />
                  {add && (
                    <div>
                      {remaining.map((user) => {
                        return (
                          <div>
                            <div className=" ">
                              <input
                                type="checkbox"
                                id={user.name}
                                name={user.name}
                                value={user._id}
                                class="checkbox"
                                onClick={(e, user) => {
                                  let memarr=[]
                                  
                                  // if (e.target.checked === true) {
                                    // setRemaining(remaining.push(user))
                                    // setSplitInto(splitInto.push(user))
                                    // setEditMode({
                                    //   details: {
                                    //     purpose: purpose,
                                    //     amount: amount,
                                    //     splitInto: splitInto.push(user),
                                    //   },
                                    //   status: true,
                                    // });
                                    let myarr=[]
                                    const index = remaining.indexOf(e.target.value)
                                    if(index > -1){
                                      splitInto.splice(index,1)
                                    }
                                    else{
                                      splitInto.push({_id: e.target.value, name: e.target.name} )
                                      myarr = remaining.filter((n) => n._id !== splitInto._id);
                                      
                                    }
                                    console.log("rrrrr",splitInto)
                                    
                                    console.log("mem",myarr)
                                    memarr.push(e.target.name)
                                    
                                                                      
                                    console.log("editMode: ",editMode, "splitInto: ", splitInto)
                                  // }
                                  console.log("memb",remaining)
                                  // console.log("check", remaining);
                                  // setAdd(true)
                                }}
                              />
                            </div>
                            <div className=" text-center mx-auto">
                              <label
                                htlmFor={user.name}
                                style={{ fontSize: 35 }}
                                className=" font-MinionPro"
                              >
                                {user.name}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
