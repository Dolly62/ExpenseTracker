import React, { useContext, useState } from "react";
import AuthContext from "../store/auth-context";
import classes from "./Auth.module.css";
import { useHistory } from "react-router-dom";
import Password from "./Password";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const authCtx = useContext(AuthContext);


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCASb28ElCQEKerlpRr_iRzZ6mFyvyruOQ";
    } else {
      if (password === confirmPassword) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCASb28ElCQEKerlpRr_iRzZ6mFyvyruOQ";
      } else {
        alert("Please put the correct password");
      }
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message);
      }
      const data = await response.json();
      // console.log(data.idToken);
      authCtx.login(data.idToken);

      history.push("/email-Verification");
    } catch (error) {
      alert(error.message);
    } finally{
      setIsLoading(false)
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <section>
      <h1 className={classes.heading}>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          required
          value={email}
          onChange={emailHandler}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          required
          value={password}
          onChange={passwordHandler}
        />
        {!isLogin && (
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={confirmPasswordHandler}
          />
        )}
        {!isLoading && (
          <button className={classes.btn} type="submit">
            {isLogin ? "Login" : "SignUp"}
          </button>
        )}
        {isLoading && <p>Loading...</p>}
        {isLogin && <Password/>}
        <button className={classes.modeBtn} onClick={switchAuthModeHandler}>
          {isLogin
            ? "Don't have an account? SignUp "
            : "Have an account? LogIn"}
        </button>
      </form>
    </section>
  );
};

export default Auth;
