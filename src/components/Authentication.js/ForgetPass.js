import React, { useState } from "react";
import classes from "./ForgetPass.module.css";

const ForgetPass = () => {
  const [emailForPassword, setEmailForPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const emailHandler = (event) => {
    setEmailForPassword(event.target.value);
  };
  const passwordResetHandler = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCASb28ElCQEKerlpRr_iRzZ6mFyvyruOQ",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailForPassword,
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
      setIsEmailSent(true);
      const data = await response.json();
      // console.log(data.email);
    } catch(error) {
        alert(error.message)
    } finally {
        setIsLoading(false)
    }
  };

  return (
    <section className={classes.container}>
      <h2 className={classes.header}>Reset Your Password</h2>
      {isEmailSent ? (
        <p>Password reset email sent. Please check your email inbox.</p>
      ) : (
        <>
          <p>Enter the email with which you have registered:</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={emailForPassword}
            onChange={emailHandler}
            required
          />
          <button onClick={passwordResetHandler} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Link"}
          </button>
        </>
      )}
    </section>
  );
};

export default ForgetPass;
