import React, { useContext } from "react";
import AuthContext from "../store/auth-context";

const EmailVer = () => {
  const authCtx = useContext(AuthContext);
  
  const idtoken = authCtx.token;
  const isLoggedIn = authCtx.isLoggedIn;

  const emailVerificationHandler = async () => {
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
      console.log(data.email);
      alert("Verification email sent successfully");
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <React.Fragment>
      {isLoggedIn && (
          <button onClick={emailVerificationHandler}>
            Send Verification Email
          </button>
      )}
    </React.Fragment>
  );
};

export default EmailVer;
