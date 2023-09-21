import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-context";
import expensesReducer from "./expense-context";


const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expensesReducer,
    }
});


export default store;