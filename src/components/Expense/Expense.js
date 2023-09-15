import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from "./Expense.module.css"

const Expense = () => {
  return (
    <div className={classes.main}>
      <h1>Welcome to Expense Tracker</h1>
      <p style={{marginLeft: "auto"}}>Your profile is Incomplete. {" "}<NavLink to="/profile">Complete now</NavLink></p>
    </div>
  )
}

export default Expense
