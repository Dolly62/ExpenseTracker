import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./auth-context";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpenses: (expense) => {},
  removeExpense: (id) => {},
});

export const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);

  const authCtx = useContext(AuthContext);

  const addExpenseHandler = (expensesItem) => {
  const existingExpense = expenses.find((existExpense) => existExpense.name === expensesItem.name)
  // console.log(existingExpense);

  if(existingExpense){
    setExpenses((prevExpenses) => prevExpenses.map((expen) => expen.name === existingExpense.name ? {
      ...expen
    } : expen))
  } else{
    setExpenses((prevExpenses) => [...prevExpenses, {...expensesItem, name: expensesItem.name}]);
  }

    // console.log(expenses.id);
  };

  const fetchExpensesHandler = async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-f3a04-default-rtdb.firebaseio.com/expenses.json"
      );
      const data = await response.json();
      // console.log(data);
      if(data){
        const expenseItems = Object.keys(data).map((key) => ({
          name: key,
          id: data[key].id,
          money: data[key].money,
          description: data[key].description,
          category: data[key].category,
        }))
        setExpenses(expenseItems)
      }else{
        setExpenses([])
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if(authCtx.isLoggedIn){
      fetchExpensesHandler()
    }
  }, [authCtx.isLoggedIn])


  const removeExpenseHandler = (expenseId) => {
    const expenseToRemove = expenses.find((delExpense) => delExpense.name === expenseId);
    // console.log(expenseToRemove);

    if(expenseToRemove){
      setExpenses((prevExpense) => prevExpense.filter((expenseDel) => expenseDel.name !== expenseId)) 
      // console.log("successfull deleted");
    }
  }

  const expenseContext = {
    expenses: expenses,
    addExpenses: addExpenseHandler,
    removeExpense: removeExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
