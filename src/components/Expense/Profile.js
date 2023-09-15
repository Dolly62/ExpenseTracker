import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Profile = () => {
const [enteredFullName, setFullName] = useState("")
const [profileImg, setProfileImg] = useState(null)
    const updateProfileHandler = (event) => {

    }

    const fullNameHandler = (event) => {
        setFullName(event.target.value)
    } 
    const profileImgHandler = (event) => {
        setProfileImg(event.target.value)
    }
  return (
    <div>
      <h2>Contact Details</h2>
      <form onSubmit={updateProfileHandler}>
        <label htmlFor="fullname">Full Name:</label>
        <input type="text" id="fullname" required value={enteredFullName} onChange={fullNameHandler}/>
        <label htmlFor="profile">Profile Photo:</label>
        <input type="file" id="profile" accept="image/png, image/jpeg" value={profileImg} onChange={profileImgHandler}/>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Profile;
