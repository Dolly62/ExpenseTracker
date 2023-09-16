import React, { useState } from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpenses: (expense) => {},
  removeExpense: (id) => {},
});

export const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (expenses) => {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      expenses
    ]);
  };
  const expenseContext = {
    expenses: expenses,
    addExpenses: addExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
