import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import classes from "./Profile.module.css";

const Profile = () => {
  const [enteredFullName, setFullName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [success, setSuccess] = useState(false);

  const idtoken = useSelector(state => state.auth.token);
  // console.log(idtoken);

  
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const updateProfileHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCASb28ElCQEKerlpRr_iRzZ6mFyvyruOQ",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: idtoken,
            displayName: enteredFullName,
            photoUrl: profileImg,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const data = await response.json();
        let profileErr = "Failed to update";
        throw new Error(profileErr);
      }
      const data = await response.json();
      // console.log(data);
    } catch (error) {
      alert(error.message);
    } finally{
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  };

  const fetchDataHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCASb28ElCQEKerlpRr_iRzZ6mFyvyruOQ",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: idtoken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.status);
      if (!response.ok) {
        const data = await response.json();
        throw new Error("Failed to get");
      }
      const data = await response.json();
      // console.log(data);

      if (data.users && data.users.length > 0) {
        const user = data.users[0];
        setFullName(user.displayName);
        setProfileImg(user.photoUrl);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if(isLoggedIn){
      fetchDataHandler();
    }
  }, [isLoggedIn])

  const fullNameHandler = (event) => {
    setFullName(event.target.value);
  };
  const profileImgHandler = (event) => {
    setProfileImg(event.target.value);
  };
  return (
    <section className={classes.profileMain}>
      <h2>Contact Details</h2>
      <form onSubmit={updateProfileHandler}>
        <label htmlFor="fullname">Full Name:</label>
        <input
          type="text"
          id="fullname"
          required
          value={enteredFullName}
          onChange={fullNameHandler}
        />
        <label htmlFor="profile">Profile Photo URL:</label>
        <input
          type="url"
          id="profile"
          placeholder="https://example.com"
          value={profileImg}
          onChange={profileImgHandler}
        />
        <button type="submit">Update</button>
        {success && (<Alert variant="success" className="mt-3">Successfully Updated!</Alert>)}
      </form>
    </section>
  );
};

export default Profile;
