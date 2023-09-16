import Auth from "./components/Authentication.js/Auth";
import { Fragment, useContext, useState } from "react";
import Expense from "./components/Expense/Expense";
import AuthContext from "./components/store/auth-context";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Profile from "./components/Expense/Profile";
import EmailVer from "./components/Authentication.js/EmailVer";
import Header from "./components/Navbar/Header";
import ProfileLink from "./components/Expense/ProfileLink";
import classes from "./App.module.css";

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div className={classes.app}>
      <Header />
      <Switch>
        {isLoggedIn && (
          <Route path="/home">
            <Expense />
          </Route>
        )}
        {!isLoggedIn && (
          <Route path="/login">
            <Auth />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/profileData">
            <ProfileLink />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/profile">
            <Profile />
          </Route>
        )}
      </Switch>
      <EmailVer/>
    </div>
  );
}

export default App;
