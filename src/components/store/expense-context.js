import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    replaceExpense(state, action) {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    updateExpense(state, action) {
      const updatedExpenseIndex = state.items.findIndex(
        (expense) => expense.name === action.payload.name
      );
      if (updatedExpenseIndex !== -1) {
        state.items[updatedExpenseIndex] = action.payload;
        state.total += action.payload.spentMoney;
      }
    },
    addExpenses(state, action) {
      state.items.push(action.payload);
      state.total += action.payload.spentMoney;
    },
    removeExpense(state, action) {
      const expenseToRemove = state.items.find(
        (delExpense) => delExpense.name === action.payload
      );
      if (expenseToRemove) {
        state.items = state.items.filter(
          (expensedel) => expensedel.name !== action.payload
        );
        state.total -= expenseToRemove.spentMoney;
      }
    },
    clearExpense(state) {
      state.items = []
    },
  },
});

export const expenseActions = expensesSlice.actions;

export default expensesSlice.reducer;
