import Auth from "./components/Authentication.js/Auth";
import Expense from "./components/Expense/Expense";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Profile from "./components/Expense/Profile";
import EmailVer from "./components/Authentication.js/EmailVer";
import Header from "./components/Navbar/Header";
import classes from "./App.module.css";
import ForgetPass from "./components/Authentication.js/ForgetPass";
import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker";
import { useDispatch, useSelector } from "react-redux";
import Theme from "./components/UI/Theme";
import { useEffect } from "react";
import { fetchExpenseData } from "./components/store/expenseActions";

function App() {
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
 const isDark = useSelector(state => state.theme.isDarkTheme);
const dispatch =  useDispatch();


 useEffect(() => {
    dispatch(fetchExpenseData());
 }, [])


  return (
      <div className={classes.app} >
        <Header />
        <Switch>
          {!isLoggedIn && (
            <Route path="/home">
              <Expense />
            </Route>
          )}

          {isLoggedIn && (
            <Route path="/expense">
              <ExpenseTracker />
            </Route>
          )}

          {!isLoggedIn && (
            <Route path="/login">
              <Auth />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/profile">
              <Profile />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/email-Verification">
              <EmailVer />
            </Route>
          )}
          {!isLoggedIn && (
            <Route path="/reset-password">
              <ForgetPass />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/theme-toggler">
              <Theme/>
            </Route>
          )}
        </Switch>
      </div>
  );
}

export default App;
