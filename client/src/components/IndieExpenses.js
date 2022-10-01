import React from "react";
import { FaWindowClose } from "react-icons/fa";

export default function IndieExpenses(props) {
  const handleClick = () => {
    props.setIndie(false);
    // console.log("on",props.indie)
  };
  console.log("in", props.name);
  console.log("all", props.all);

  let indieExpenses = [];
  props.all.forEach((e) => {
    if (e.owner.name === props.name) {
      indieExpenses.push(e);
    }
  });
  console.log("indie", indieExpenses);

  return (
    <div className="border-2  my-24 mx-32 rounded-t-xl bg-white" id="tranbg">
      <div className="p-4 bg-[#E18A07] rounded-t-xl">
        <h2 className="text-center">Expenses</h2>
      </div>
      <div className="mt-6">
        {indieExpenses.map((names) => {
          return (
            <>
              <div className=" p-2 grid grid-cols-2 gap-4">
                <div className=" text-center">{names.purpose}</div>
                <div className=" text-center">₹{names.amount}</div>
              </div>
              <hr className="mx-16 " />
            </>
          );
        })}

        <div className=" text-center">
          <button
            onClick={handleClick}
            className=" border-[3px] rounded-[10px] border-black py-2 px-3"
          >
            <FaWindowClose className="m-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
