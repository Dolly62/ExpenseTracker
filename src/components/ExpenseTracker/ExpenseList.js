import React, { useContext } from "react";
import ExpenseContext from "../store/expense-context";
import AuthContext from "../store/auth-context";

const ExpenseList = () => {
  const expCtx = useContext(ExpenseContext);
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <section>
      {isLoggedIn}
      <h2>Day-to-Day Expenses</h2>
      <ul>
        {expCtx.expenses.map((expense) => (
          <li key={expense.id}>
            {expense.money} - {expense.description} - {expense.category}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExpenseList;
