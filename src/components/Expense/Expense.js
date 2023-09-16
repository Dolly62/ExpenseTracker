import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Expense.module.css";
import Logout from "../Authentication.js/Logout";
import AuthContext from "../store/auth-context";

const Expense = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div className={classes.main}>
      {isLoggedIn && <h1>Welcome to Expense Tracker</h1>}
      {isLoggedIn && (
        <p style={{ marginLeft: "auto" }}>
          Your profile is Incomplete.{" "}
          <NavLink to="/profile">Complete now</NavLink>
        </p>
      )}
      <NavLink to="/login">Login</NavLink>
      <Logout />
    </div>
  );
};

export default Expense;
