import React from 'react'
import { NavLink } from 'react-router-dom'

const Expense = () => {
  return (
    <div>
      Welcome to Expense Tracker
      Your profile is Incomplete.<NavLink to="/profile">Complete now</NavLink>
    </div>
  )
}

export default Expense
