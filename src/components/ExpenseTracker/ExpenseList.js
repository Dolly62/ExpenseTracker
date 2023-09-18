import React, { useContext } from "react";
import ExpenseContext from "../store/expense-context";
import AuthContext from "../store/auth-context";
// import Expenses from "./Expenses";

const ExpenseList = () => {
  const expCtx = useContext(ExpenseContext);
  // const authCtx = useContext(AuthContext);

  // const isLoggedIn = authCtx.isLoggedIn;

  const deleteExpense = async (name) => {
    try {
      const response = await fetch(
        `https://expense-tracker-f3a04-default-rtdb.firebaseio.com/expenses/${name}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete");
      }
      expCtx.removeExpense(name);
      // console.log("succefully deleted from db");
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <section>
      {/* {isLoggedIn} */}
      <h3>Day-to-Day Expenses</h3>
      <ul>
        {expCtx.expenses && expCtx.expenses.length > 0 ? (
          expCtx.expenses.map((expense) => (
            <li key={expense.name}>
              {expense.money} - {expense.description} - {expense.category} -{" "}
              <button onClick={() => deleteExpense(expense.name)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No Expense is found</p>
        )}
      </ul>
    </section>
  );
};

export default ExpenseList;
