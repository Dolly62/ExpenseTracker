import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-context";
import expensesReducer from "./expense-context";
import themeReducer from "./themeStore";


const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expensesReducer,
        theme: themeReducer,
    }
});


export default store;