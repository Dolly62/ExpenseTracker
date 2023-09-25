import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./EmailVer.module.css";
import { useSelector } from "react-redux";

const EmailVer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const idtoken = useSelector(state => state.auth.token);

  const [verificationSent, sentVerificationSent] = useState(false);
  // console.log(idtoken);

  const history = useHistory();


  useEffect(() => {
    if(idtoken){
      sentVerificationSent(true);
      setTimeout(() => {
        history.push("/expense");
      }, 2000)
    }
  }, [idtoken])



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
      sentVerificationSent(true);
      // console.log(data.email);
      // alert("Verification email sent successfully");
      
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <section>
        {verificationSent ? (<p>Verification email sent! Please check your inbox.</p>) : (
          <button className={classes.btn} onClick={emailVerificationHandler} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Verification Email"}
          </button>
        )}
      </section>
    </React.Fragment>
  );
};

export default EmailVer;
