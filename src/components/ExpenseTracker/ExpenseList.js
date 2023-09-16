import React, { useContext } from "react";
import ExpenseContext from "../store/expense-context";

const ExpenseList = () => {
  const expCtx = useContext(ExpenseContext);

  return (
    <div>
      <h2>Day-to-Day Expenses</h2>
      <ul>
        {expCtx.expenses.map((expense) => (
          <li key={expense.id}>
            {expense.money} - {expense.description} - {expense.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
