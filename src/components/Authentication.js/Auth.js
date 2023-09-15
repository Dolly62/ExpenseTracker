import React, { useContext, useState } from "react";
import AuthContext from "../store/auth-context";
import classes from "./Auth.module.css"

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      setIsLoading(true);
      let url;
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCASb28ElCQEKerlpRr_iRzZ6mFyvyruOQ";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCASb28ElCQEKerlpRr_iRzZ6mFyvyruOQ";
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            res.json().then((data) => {
              //   console.log(data);
              const err = "Failed";
              throw new Error(err);
            });
          }
        })
        .then((data) => {
          console.log(data);
          authCtx.login(data.idToken)
        })
        .catch((error) => {
          alert(error.message);
        });
    }else{
        alert("Please put the correct password")
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
        {!isLogin && <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={confirmPasswordHandler}
        />}
        {!isLoading && (
          <button className={classes.btn} type="submit">{isLogin ? "Login" : "SignUp"}</button>
        )}
        {isLoading && <p>Loading...</p>}
        <button className={classes.modeBtn} onClick={switchAuthModeHandler}>
          {isLogin ? "Create new account" : "Login with existing account"}
        </button>
      </form>
    </section>
  );
};

export default Auth;
