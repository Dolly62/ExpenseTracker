import React, { Fragment } from "react";
import classes from "./Password.module.css";
import { useHistory } from "react-router-dom";

const Password = () => {
  const history = useHistory();

  const passwordForgetHandler = () => {
    history.push("/reset-password");
  };

  return (
    <Fragment>
      <button className={classes.passsty} onClick={passwordForgetHandler}>
        Forget Passwod
      </button>
    </Fragment>
  );
};

export default Password;
