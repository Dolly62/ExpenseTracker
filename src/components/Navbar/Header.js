import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Logout from "../Authentication.js/Logout";
import classes from "./Header.module.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
  // const authCtx = useContext(AuthContext);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Fragment>
      <Navbar className={classes.navmain} expand="sm">
        <Container>
          <Navbar.Brand
            href="/"
            style={{ fontSize: "1.6rem", fontWeight: "bolder", color: "white" }}
          >
            Expense Tracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center"
          >
            <Nav className={classes.navbar}>
              {isLoggedIn && (
                <Nav.Item
                  className="p-2 m-4 mx-3"
                  style={{
                    fontSize: "1.3rem",
                    width: "6rem",
                    fontWeight: "bold",
                  }}
                >
                  <NavLink to="/home" activeClassName={classes.active}>
                    Home
                  </NavLink>
                </Nav.Item>
              )}
              {isLoggedIn && (
                <Nav.Item
                  className="p-2 m-4 mx-3"
                  style={{
                    fontSize: "1.3rem",
                    width: "6rem",
                    fontWeight: "bold",
                  }}
                >
                  <NavLink to="/expense" activeClassName={classes.active}>
                    Expense
                  </NavLink>
                </Nav.Item>
              )}
              {isLoggedIn && (
                <Nav.Item
                  className="p-2 m-4 mx-3"
                  style={{
                    fontSize: "1.3rem",
                    width: "6rem",
                    fontWeight: "bold",
                  }}
                >
                  <NavLink to="/profileData" activeClassName={classes.active}>
                    Profile
                  </NavLink>
                </Nav.Item>
              )}
              {!isLoggedIn && (
                <Nav.Item
                  className="p-2 m-4 mx-3"
                  style={{
                    fontSize: "1.3rem",
                    width: "6rem",
                    fontWeight: "bold",
                  }}
                >
                  <NavLink to="/login" activeClassName={classes.active}>
                    Login
                  </NavLink>
                </Nav.Item>
              )}
              {isLoggedIn && (
                <Nav.Item
                  className="p-2 m-4 mx-3"
                  style={{
                    fontSize: "1.3rem",
                    width: "6rem",
                    fontWeight: "bold",
                  }}
                >
                  <Logout />
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;
