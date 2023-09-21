// import React, { useContext, useEffect, useState } from "react";
// import AuthContext from "./auth-context";
import { createSlice } from "@reduxjs/toolkit";


const initialExpenseState = {
    items: [],
    total: 0
}
const expensesSlice = createSlice({
  name: 'expenses',
  initialState: initialExpenseState,
  reducers: {
    addExpenses(state, action) {
      const updateData = action.payload;
      const updateExpenseIndex = state.items.findIndex((updateExp) => updateExp.name === updateData.name);
      if(updateExpenseIndex !== -1){
        state.items[updateExpenseIndex] = updateData;
      }else{
        state.items.push(action.payload);
      }
      state.total += action.payload.money;
    },
    removeExpense(state, action) {
      const expenseToRemove = state.items.find((delExpense) => delExpense.name === action.payload);
      if(expenseToRemove){
        state.items = state.items.filter((expensedel) => expensedel.name !== action.payload)
        state.total -= expenseToRemove.money;
      }
    }
  }
})


export const expenseActions = expensesSlice.actions;

export default expensesSlice.reducer;

