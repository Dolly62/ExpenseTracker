import React, { useContext } from 'react'
import AuthContext from '../store/auth-context'
import { useHistory } from 'react-router-dom';
import classes from "./Logout.module.css";

const Logout = () => {
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const logoutHandler = () => {
        authCtx.logout();
        history.replace("/login")
    }
  return (
    <button className={classes.logoutBtn} onClick={logoutHandler}>
      Logout
    </button>
  )
}

export default Logout
