import React, { useContext } from "react";
import ExpenseContext from "../store/expense-context";
import AuthContext from "../store/auth-context";
import Expenses from "./Expenses";

const ExpenseList = () => {
  const expCtx = useContext(ExpenseContext);
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  // const expenseHandler = (expenses) => {
  //   expCtx.addExpenses(expenses)
  // }
  return (
    <section>
      {isLoggedIn}
      <h3>Day-to-Day Expenses</h3>
      <ul>
        {expCtx.expenses && expCtx.expenses.length > 0 ? (
          expCtx.expenses.map((expense) => (
            <Expenses
              id={expense.id}
              money={expense.money}
              description={expense.description}
              category={expense.category}
              // onAdd={expenseHandler.bind(null, expense)}
            />
          ))
        ) : (
          <p>No Expense is found</p>
        )}
      </ul>
    </section>
  );
};

export default ExpenseList;
