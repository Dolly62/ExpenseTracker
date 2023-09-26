import React, { useState, Fragment } from "react";
import { expenseActions } from "../store/expense-context";
import ExpenseList from "./ExpenseList";
import classes from "./ExpenseTracker.module.css";
import { useDispatch, useSelector } from "react-redux";

const ExpenseTracker = () => {
  const [spentMoney, setSpentMoney] = useState("");
  const [spentDescription, setSpentDescription] = useState("");
  const [category, setCategory] = useState("Fruits");
  const email = useSelector((state) => state.auth.email);
  
  // console.log(email);

  const dispatch = useDispatch();

  //For EDIT
  const [editExpenseName, setEditExpenseName] = useState(null);

  const editExpenseHandler = (expense) => {
    // console.log(expense.name);
    setEditExpenseName(expense.name);
    setSpentMoney(expense.spentMoney);
    setSpentDescription(expense.spentDescription);
    setCategory(expense.category);
  };

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}  ${hours}:${minutes}:${seconds}`;

  const expenseHandler = async (event) => {
    event.preventDefault();
    const emailId = email.replace(/[@.]/g, "");
    const expenseForm = {
      spentMoney,
      spentDescription,
      category,
      at: formattedDate,
    };

    try {
      // console.log(email);
      if (editExpenseName === null) {
        const response = await fetch(
          `https://expense-tracker-f3a04-default-rtdb.firebaseio.com/expenses/${emailId}.json`,
          {
            method: "POST",
            body: JSON.stringify(expenseForm),
          }
        );
        const data = await response.json();
        // console.log(data.name);
        dispatch(
          expenseActions.addExpenses({
            name: data.name,
            spentMoney,
            spentDescription,
            category,
            at: formattedDate,
          })
        );
      } else {
        const response = await fetch(
          `https://expense-tracker-f3a04-default-rtdb.firebaseio.com/expenses/${emailId}/${editExpenseName}.json`,
          {
            method: "PUT",
            body: JSON.stringify(expenseForm),
          }
        );
        const data = await response.json();
        // console.log(data);

        dispatch(
          expenseActions.updateExpense({
            name: editExpenseName,
            spentMoney,
            spentDescription,
            category,
            at: formattedDate,
          })
        );
        setEditExpenseName(null);
      }
    } catch (error) {
      alert(error);
    }

    setSpentMoney("");
    setSpentDescription("");
    setCategory("Fruits");
  };

  const spentMoneyHandler = (event) => {
    setSpentMoney(event.target.value);
  };
  const spentDescriptionHandler = (event) => {
    setSpentDescription(event.target.value);
  };
  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Fragment>
      <section className={classes.container}>
        <h2>Add Your Daily Expense</h2>
        <form onSubmit={expenseHandler}>
          <input
            type="number"
            id="money"
            placeholder="Enter the amount you spent"
            required
            value={spentMoney}
            onChange={spentMoneyHandler}
          />
          <input
            type="text"
            id="description"
            placeholder="Description..."
            required
            value={spentDescription}
            onChange={spentDescriptionHandler}
          />
          <select
            name="Category"
            id="category"
            value={category}
            onChange={categoryChangeHandler}
          >
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Petrol">Petrol</option>
            <option value="Medicine">Medicine</option>
            <option value="Drink">Drink</option>
            <option value="Grocery">Grocery</option>
          </select>

          <button type="submit">
            {editExpenseName !== null ? "Save" : "Add Expense"}
          </button>
        </form>
      </section>
      <ExpenseList onEdit={editExpenseHandler} />
    </Fragment>
  );
};

export default ExpenseTracker;
