import React, { useEffect } from "react";
import { expenseActions } from "../store/expense-context";
import { useDispatch, useSelector } from "react-redux";
// import AuthContext from "../store/auth-context";
import classes from "./ExpenseList.module.css";
import { Col, Row, Table } from "react-bootstrap";

const ExpenseList = (props) => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const totalAmount = (expenses || []).reduce((total, item) => {
    const itemMoney = parseFloat(item.money);
    return total + itemMoney;
  }, 0);

  // const fetchExpensesHandler = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://expense-tracker-f3a04-default-rtdb.firebaseio.com/expenses.json"
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     console.log(data.key);
  //     if(data){
  //       const expenseItems = Object.keys(data).map((key) => ({
  //         name: key,
  //         id: data[key].id,
  //         money: data[key].money,
  //         description: data[key].description,
  //         category: data[key].category,
  //       }))
  //       dispatch(expenseActions.addExpenses(expenseItems));
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  // useEffect(() => {
  //   if(isLoggedIn){
  //     fetchExpensesHandler()
  //   }
  // }, [isLoggedIn])

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

  const downloadCSV = () => {
    const headers = ["Name", "Money", "Description", "Category"];
    const csvData = [headers];

    expenses.forEach((expense) => {
      const row = [expense.money, expense.description, expense.category];
      csvData.push(row);
    });

    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenseData.csv");
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <section className={classes.expenseData}>
      <button onClick={downloadCSV} className={classes.downloadBtn}>
        Download Expense
      </button>
      <Row>
        <Col>
          <h3>Day-to-Day Expenses</h3>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>Money</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.length > 0 ? (
            expenses.map((expense) => (
              <tr key={expense.name}>
                <td>
                {expense.money}
                </td>
                <td>
                {expense.description}
                </td>
                <td>
                {expense.category}
                </td>
                <td>
                  <button onClick={() => props.onEdit(expense)}>Edit</button>
                  <button onClick={() => deleteExpense(expense.name)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <p>No Expense is found</p>
          )}
        </tbody>
      </Table>
      <tr>
        <td>Total Amount:</td>
        <td>Rs.{totalAmount.toFixed(2)}</td>
      </tr>
    </section>
  );
};

export default ExpenseList;
