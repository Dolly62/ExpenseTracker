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

  const addExpenseHandler = (expenses) => {
    setExpenses((prevExpenses) => [...prevExpenses, {...expenses, name: expenses.name}]);
    // console.log(expenses.name);
  };

  const fetchExpensesHandler = async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-f3a04-default-rtdb.firebaseio.com/expenses.json"
      );
      const data = await response.json();
      console.log(data);
      if(data){
        const expenseItems = Object.keys(data).map((key) => ({
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
