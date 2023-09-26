import React from "react";
import { authActions } from "../store/auth-context";
import { useHistory } from "react-router-dom";
import classes from "./Logout.module.css";
import { useDispatch } from "react-redux";
import { MdLogout } from "react-icons/md";

const Logout = () => {
  // const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const history = useHistory();
  const logoutHandler = () => {
    // authCtx.logout();
    dispatch(authActions.logout());
    localStorage.removeItem("idToken");
    localStorage.removeItem("email");
    history.replace("/login");
  };
  return (
    <button className={classes.logoutBtn} onClick={logoutHandler}>
      <MdLogout title="Logout"/>
    </button>
  );
};

export default Logout;
