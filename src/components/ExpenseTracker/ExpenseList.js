import React from "react";
import { expenseActions } from "../store/expense-context";
import { useDispatch, useSelector } from "react-redux";
import classes from "./ExpenseList.module.css";
import { Col, Row, Table } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline, MdOutlineDownload } from "react-icons/md";

const ExpenseList = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.expenses.items);
  const email = useSelector((state) => state.auth.email);

  const totalAmount = (items || []).reduce((total, item) => {
    return total + parseFloat(item.spentMoney);
  }, 0);

  const deleteExpense = async (name) => {
    const emailId = email.replace(/[@.]/g, "");
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
        <MdOutlineDownload title="Download expense" />
      </button>
      <Row>
        <Col>
          <h3>Day-to-Day Expenses</h3>
        </Col>
      </Row>
      <Table>
        <thead style={{ borderBottom: "white" }}>
          <tr>
            <th style={{ color: "#e29247" }}>Money</th>
            <th style={{ color: "#e29247" }}>Description</th>
            <th style={{ color: "#e29247" }}>Category</th>
            <th style={{ color: "#e29247" }}>Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((expense) => (
              <tr key={expense.name} id={expense.id}>
                <td>
                  Rs.
                  {expense.spentMoney}
                </td>
                <td>{expense.spentDescription}</td>
                <td>{expense.category}</td>
                <td>{expense.at}</td>
                <td>
                  <button
                    className={classes.editBtn}
                    onClick={() => props.onEdit(expense)}
                  >
                    <FiEdit2 title="Edit" />
                  </button>
                  <button
                    className={classes.delBtn}
                    onClick={() => deleteExpense(expense.name)}
                  >
                    <MdDeleteOutline title="Delete" />
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
      </Table>
      <div className={classes.footer}>
        Total Amount:
        <span>Rs.{totalAmount.toFixed(2)}</span>
      </div>
    </section>
  );
};

export default ExpenseList;
