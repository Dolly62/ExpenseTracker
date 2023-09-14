import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
      if (isLogin) {
      } else {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCASb28ElCQEKerlpRr_iRzZ6mFyvyruOQ",
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          if (res.ok) {
          } else {
            res.json().then((data) => {
              console.log(data);
            });
          }
        });
      }
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
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
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
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={confirmPasswordHandler}
        />
        <button type="submit">{isLogin ? "Login" : "SignUp"}</button>
        <button onClick={switchAuthModeHandler}>
          {isLogin ? "Create new account" : "Login with existing account"}
        </button>
      </form>
    </section>
  );
};

export default Auth;