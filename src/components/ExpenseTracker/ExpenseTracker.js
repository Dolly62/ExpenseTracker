import React, { useState, useContext, Fragment } from "react";
import ExpenseContext from "../store/expense-context";
import ExpenseList from "./ExpenseList";
import classes from "./ExpenseTracker.module.css";

const ExpenseTracker = () => {
  const [spentMoney, setSpentMoney] = useState("");
  const [spentDescription, setSpentDescription] = useState("");
  const [category, setCategory] = useState("");
  const expCtx = useContext(ExpenseContext);

  //For EDIT
  const [editExpenseName, setEditExpenseName] = useState(null);
  const [editMoney, setEditMoney] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const expenseHandler = async (event) => {
    event.preventDefault();
    const expenseForm = {
      id: Math.random().toString(),
      money: spentMoney,
      description: spentDescription,
      category: category,
    };

    const updatedExpenseForm = {
      money: editMoney,
      description: editDescription,
      category: editCategory,
    }
    try {
      if (editExpenseName === null) {
        const response = await fetch(
          "https://expense-tracker-f3a04-default-rtdb.firebaseio.com/expenses.json",
          {
            method: "POST",
            body: JSON.stringify(expenseForm),
          }
        );
        const data = await response.json();
        // console.log(data.name);
        expCtx.addExpenses({
          name: data.name,
          // id: Math.random().toString(),
          money: spentMoney,
          description: spentDescription,
          category: category,
        });
      } else {
        const response = await fetch(
          `https://expense-tracker-f3a04-default-rtdb.firebaseio.com/expenses/${editExpenseName}.json`,
          {
            method: "PUT",
            body: JSON.stringify(updatedExpenseForm)
          }
        );
        const data = await response.json();
        expCtx.addExpenses({
          name: editExpenseName,
          money: editMoney,
          description: editDescription,
          category: editCategory,
        });
      }
    } catch (error) {
      alert(error);
    }

    setSpentMoney("");
    setSpentDescription("");
    setCategory("");
    setEditMoney("");
    setEditDescription("");
    setEditCategory("");
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

  const editExpenseHandler = (expense) => {
    // console.log(expense.name);
    setEditExpenseName(expense.name);
    setEditMoney(expense.money);
    setEditDescription(expense.description);
    setEditCategory(expense.category);
  };

  return (
    <Fragment>
      <section className={classes.container}>
        <h2>Add Your Daily Expense</h2>
        {}
        <form onSubmit={expenseHandler}>
          {editExpenseName !== null ? (
            <div>
              <input
                type="number"
                placeholder="Enter the money you spent"
                required
                value={editMoney}
                onChange={(e) => setEditMoney(e.target.value)}
              />
              <input
                type="text"
                placeholder="Description..."
                required
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <select
                name="Category"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              >
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Petrol">Petrol</option>
                <option value="Health">Health</option>
                <option value="Drink">Drink</option>
              </select>
            </div>
          ) : (
            <>
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
                <option value="Drink">Drink</option>
              </select>
            </>
          )}
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
