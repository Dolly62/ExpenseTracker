import Auth from "./components/Authentication.js/Auth";
import { useContext, useState } from "react";
import Expense from "./components/Expense/Expense";
import AuthContext from "./components/store/auth-context";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Profile from "./components/Expense/Profile";
import EmailVer from "./components/Authentication.js/EmailVer";

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div className="App">
      {isLoggedIn && <Expense />}
      <Switch>
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
      </Switch>
      <EmailVer />
    </div>
  );
}

export default App;
