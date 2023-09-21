import React, { useEffect } from "react";
import { expenseActions } from "../store/expense-context";
import { useDispatch, useSelector } from "react-redux";
// import AuthContext from "../store/auth-context";

const ExpenseList = (props) => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);
  const isLoggedIn = useSelector((state => state.auth.isLoggedIn));

  const totalAmount = (expenses || []).reduce((total, item) => {
    const itemMoney = parseFloat(item.money);
      return total + itemMoney;
  }, 0);


  const fetchExpensesHandler = async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-f3a04-default-rtdb.firebaseio.com/expenses.json"
      );
      const data = await response.json();
      console.log(data);
      console.log(data.key);
      if(data){
        const expenseItems = Object.keys(data).map((key) => ({
          name: key,
          id: data[key].id,
          money: data[key].money,
          description: data[key].description,
          category: data[key].category,
        }))
        dispatch(expenseActions.addExpenses(expenseItems));
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if(isLoggedIn){
      fetchExpensesHandler()
    }
  }, [isLoggedIn])

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
      // expCtx.removeExpense(name);
      dispatch(expenseActions.removeExpense(name));
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
        {expenses && expenses.length > 0 ? (
          expenses.map((expense) => (
            <li key={expense.name}>
              {expense.money} - {expense.description} - {expense.category} -{" "}
              <button onClick={() => props.onEdit(expense)}>Edit</button>
              <button onClick={() => deleteExpense(expense.name)}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No Expense is found</p>
        )}
      </ul>
      <div>
        Total Amount: <span>Rs.${totalAmount.toFixed(2)}</span>
      </div>
    </section>
  );
};

export default ExpenseList;
