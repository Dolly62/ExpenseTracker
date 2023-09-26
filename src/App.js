import Auth from "./components/Authentication.js/Auth";
import Expense from "./components/Expense/Expense";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Profile from "./components/Expense/Profile";
import EmailVer from "./components/Authentication.js/EmailVer";
import Header from "./components/Navbar/Header";
import ForgetPass from "./components/Authentication.js/ForgetPass";
import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker";
import { useDispatch, useSelector } from "react-redux";
import "./App.css"
import { useEffect } from "react";
import { expenseActions } from "./components/store/expense-context";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  // console.log(email);

  // FETCH THE DATA
  const fetchExpenseData = async () => {
    const emailId = email.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://expense-tracker-f3a04-default-rtdb.firebaseio.com/expenses/${emailId}.json`
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message);
      }
      const data = await response.json();

      if (data !== null) {
        const expenseArray = Object.keys(data).map((key) => ({
          name: key,
          ...data[key],
        }));
        dispatch(expenseActions.replaceExpense({ items: expenseArray }));
      } else {
        return;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if(isLoggedIn){
      fetchExpenseData();
    }else{
      dispatch(expenseActions.clearExpense());
    }
  }, [isLoggedIn]);

  return (
    <div className={`App ${isDarkTheme ? "dark-theme" : ""}`}>
      <Header />
      <Switch>
          <Route path="/home">
            <Expense />
          </Route>

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
      </Switch>
    </div>
  );
}

export default App;
