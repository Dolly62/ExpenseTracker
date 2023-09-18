import React from "react";

const Expenses = (props) => {
  return (
    <>
      <li key={props.id}>
        {props.money} - {props.description} - {props.category}
      </li>
    </>
  );
};

export default Expenses;
