import Auth from "./components/Authentication.js/Auth";
import { useContext } from "react";
import Expense from "./components/Expense/Expense";
import AuthContext from "./components/store/auth-context";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Profile from "./components/Expense/Profile";

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div className="App">
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Expense />}
      <Switch>
        {isLoggedIn && <Route path="/profile">
          <Profile />
        </Route>}
      </Switch>
    </div>
  );
}

export default App;
