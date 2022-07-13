import React, { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'
import Navbar from '../components/Navbar';

const User = () => {

  const [purpose, setpurpose] = useState();
  const [amount, setamount] = useState();

  const [data, setdata] = useState("");
  const [expenseData, setExpenseData] = useState("");
  const [allExpenses, setAllExpenses] = useState("");

  const x = localStorage.getItem("jwt_token")
  // console.log(x)
  console.log("aaa", allExpenses)
  useEffect(() => {
    axios({
      method: 'get',
      url: '/user',
      headers: {
        'Authorization': `Bearer ${x}`
      }
    })
      .then((response) => {
        console.log("done")
        // console.log(response)
        setdata(response.data)
        // console.log("16", response.data)
      })
      .catch(error => console.log(error))

  }, []);

  useEffect(() => {
    axios({
      method: 'get',
      url: '/getexpenses',
      headers: {
        'Authorization': `Bearer ${x}`
      }
    })
      .then((response) => {
        setAllExpenses(response.data)
        console.log("paisa",response.data)
      })
      .catch(error => console.log(error))
  }, []);

  
  const addExpense = (e) => {
    e.preventDefault()
    setExpenseData({
      "purpose": purpose,
      "amount": amount
    })

    axios({
      method: 'post',
      url: '/addexpense',
      data: expenseData,
      headers: {
        'Authorization': `Bearer ${x}`
      }
    })
      .then((response) => {
        console.log(response)
      })
      .catch(error => console.log(error))
  }


  return (<>
    {data && (
      <div>
        <Navbar />
        <div className=' absolute w-full h-[60%] top-50% flex flex-col mt-28 font-Montserrat text-3xl  text-[#E18A07] px-10'>
          <div className=' font-extrabold flex-col'>Hey There!</div>

          <div className='pt-2 text-black text-xl'><div className=''>
            {data.name}
          </div></div>
          {/* <p>{!data ? "Loading..." : data}</p> */}

          <div className=' pt-12 text-black font-bold'>Monthly Spend</div>
          <div className=' pt-8 text-black font-bold'><spam className='text-[#E18A07]'>5,345</spam>/10,000</div>
          <div className='flex-row pt-8'>
            <div className=' w-[30%] h-9 bg-[#D9D9D9]'><div className=' w-[50%] h-9 bg-black'></div></div>
          </div>
          <div className='flex flex-col justify-center items-center h-full '>
            <form className='max-w-[1100px] mx-auto w-full rounded-md border-2 border-black p-8 mt-12'>
              <h2 className='text-4xl font-bold text-center py-6'>ENTER YOUR EXPENSES</h2>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-col mb-4'>
                  <label className='text-center'>Amount</label>
                  <input className='relative border-2 border-black bg-gray-100 p-2 w-[300px]'
                    type="number"
                    placeholder='₹ Amount'
                    onChange={(e) => { setamount(e.target.value) }}
                    value={amount}
                  />
                </div>
                <div className='flex flex-col mb-4'>
                  <label className='text-center'>Category</label>
                  <input className='border-2 border-black relative bg-gray-100 p-2 w-[300px]'
                    type="text"
                    placeholder='Food'
                    onChange={(e) => { setpurpose(e.target.value) }}
                    value={purpose}
                  />
                </div>
              </div>
              <button className='flex justify-center items-center bg-black text-white mx-auto p-2 rounded-md my-2' onClick={addExpense}>Add Spend</button>
            </form>
          </div>
        </div>
        <img className=' pl-[50%] h-[446px] pt-[5rem]' src='/assests/home.png' alt="try" />
      </div>)
    }
  </>
  )
}

export default User