import "./App.css";
import Auth from "./components/Authentication.js/Auth";
import { useContext } from "react";
import Expense from "./components/Expense/Expense";
import AuthContext from "./components/store/auth-context";

function App() {
const authCtx = useContext(AuthContext)
 
const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div className="App">
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Expense/>}
    </div>
  );
}

export default App;
