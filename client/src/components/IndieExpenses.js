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
            IndieExpenses
            <div>
                {indieExpenses.map((e) => {
                    return (
                        <p>
                            e
                        </p>
                    )
                })}
            </div>
            <button className='bg-black text-white p-5' onClick={handleClick}>ok</button>
        </div>
    )
}
