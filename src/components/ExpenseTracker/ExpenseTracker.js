import React, { useState, useContext, Fragment } from "react";
import ExpenseContext from "../store/expense-context";
import ExpenseList from "./ExpenseList";
import classes from "./ExpenseTracker.module.css";

const ExpenseTracker = () => {
  const [spentMoney, setSpentMoney] = useState("");
  const [spentDescription, setSpentDescription] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const expCtx = useContext(ExpenseContext);

  const expenseHandler = (event) => {
    event.preventDefault();
    expCtx.addExpenses({
      id: Math.random().toString(),
      money: spentMoney,
      description: spentDescription,
      category: category,
    });
    setSpentMoney("");
    setSpentDescription("");
    setCategory("Vegetable");
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
      <h1>Add Your Daily Expense</h1>
      <form onSubmit={expenseHandler}>
        <input
          type="number"
          placeholder="Enter the money you spent"
          required
          value={spentMoney}
          onChange={spentMoneyHandler}
        />
        <input
          type="text"
          placeholder="Description..."
          required
          value={spentDescription}
          onChange={spentDescriptionHandler}
        />
        <select
          name="Category"
          value={category}
          onChange={categoryChangeHandler}
        >
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="petrol">Petrol</option>
          <option value="health">Health</option>
          <option value="drink">Drink</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
    </section>
      <ExpenseList/>
    </Fragment>
  );
};

export default ExpenseTracker;
