import React from "react";
import { expenseActions } from "../store/expense-context";
import { useDispatch, useSelector } from "react-redux";
import classes from "./ExpenseList.module.css";
import { Col, Row, Table } from "react-bootstrap";

const ExpenseList = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.expenses.items);
  const email = useSelector(state => state.auth.email);
  const emailId = email.replace(/[@.]/g, "");

  const totalAmount = (items || []).reduce((total, item) => {
    return total + parseFloat(item.spentMoney);
  }, 0);


  const deleteExpense = async (name) => {
    try {
      const response = await fetch(
        `https://expense-tracker-f3a04-default-rtdb.firebaseio.com/expenses/${emailId}/${name}.json`,
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

    items.forEach((expense) => {
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
            <th>Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((expense) => (
              <tr key={expense.name} id={expense.id}>
                <td>
                {expense.spentMoney}
                </td>
                <td>
                {expense.spentDescription}
                </td>
                <td>
                {expense.category}
                </td>
                <td>
                {expense.at}
                </td>
                <td>
                  <button className={classes.editBtn} onClick={() => props.onEdit(expense)} >Edit</button>
                  <button className={classes.delBtn} onClick={() => deleteExpense(expense.name)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No Expense is found</td>
            </tr>
          )}
        </tbody>
        <tfoot>
      <tr>
        <td>Total Amount:</td>
        <td>Rs.{totalAmount.toFixed(2)}</td>
      </tr>
        </tfoot>
      </Table>
    </section>
  );
};

export default ExpenseList;
