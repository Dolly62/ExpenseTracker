
import classes from "./Expense.module.css";
import expenseImg from "../img/welcomeImg.png";

const Expense = () => {
  // const authCtx = useContext(AuthContext);

  // const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div className={classes.main}>
      <h1>Welcome to Expense Tracker</h1>
      {/* <img src={expenseImg}/> */}
    </div>
  );
};

export default Expense;
