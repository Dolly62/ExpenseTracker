import React, { useContext, useState } from "react";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import classes from "./EmailVer.module.css";

const EmailVer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const idtoken = authCtx.token;
  // const isLoggedIn = authCtx.isLoggedIn;

  const history = useHistory();

  const emailVerificationHandler = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCASb28ElCQEKerlpRr_iRzZ6mFyvyruOQ",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: idtoken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message);
      }
      const data = await response.json();
      // console.log(data.email);
      // alert("Verification email sent successfully");
      history.replace("./home");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <section>
          <button className={classes.btn} onClick={emailVerificationHandler} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Verification Email"}
          </button>
      </section>
    </React.Fragment>
  );
};

export default EmailVer;
