import React from 'react'

export default function IndieExpenses(props) {
    const handleClick = () => {
        props.setIndie(false)
        // console.log("on",props.indie)
    }
    console.log("in", props.name)
    console.log("all", props.all)

    let indieExpenses = []
    props.all.forEach((e) => {
        if (e.owner.name === props.name) {
            indieExpenses.push(e)
        }
    })
    console.log("indie", indieExpenses)

    return (
        <div>
            <h1>Expenses</h1>
            <div className='bg-gray-500'>
                {indieExpenses.map((e) => {
                    return (
                        <div className=' bg-gray-200 '>
                            
                            <p>{e.purpose}=={e.amount}</p>                    
                        </div>
                    )
                })}
            </div>
            <button className='bg-black text-white p-5' onClick={handleClick}>
                Show All
            </button>
        </div>
    )
}
