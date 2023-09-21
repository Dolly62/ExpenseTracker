import React, { Fragment, useContext } from "react";
import AuthContext from "../store/auth-context";
import { NavLink } from "react-router-dom";

const ProfileLink = () => {
  // const authCtx = useContext(AuthContext);

  // const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Fragment>
        <p>
          Your profile is Incomplete.
          <NavLink to="/profile">
            Complete now
          </NavLink>
          </p>
    </Fragment>
  );
};

export default ProfileLink;
