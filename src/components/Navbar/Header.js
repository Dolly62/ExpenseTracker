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
            style={{ fontSize: "1.8rem", fontWeight: "bolder", color: "white" }}
          >
            Xpense <span style={{ fontSize: "0.9rem" }}>Tracker</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center"
          >
            <Nav className={classes.navbar}>
              {!isLoggedIn && (
                <Nav.Item
                  className="p-2 m-2 mx-3"
                  style={{
                    fontSize: "1.2rem",
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
                  className="p-2 m-2 mx-3"
                  style={{
                    fontSize: "1.2rem",
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
                  className="p-2 m-2 mx-3"
                  style={{
                    fontSize: "1.2rem",
                    width: "6rem",
                    fontWeight: "bold",
                  }}
                >
                  <NavLink to="/profile" activeClassName={classes.active}>
                    Profile
                  </NavLink>
                </Nav.Item>
              )}
              {!isLoggedIn && (
                <Nav.Item
                  className="p-2 m-2 mx-3"
                  style={{
                    fontSize: "1.2rem",
                    width: "6rem",
                    fontWeight: "bold",
                  }}
                >
                  <NavLink to="/login" activeClassName={classes.active}>
                    Login
                  </NavLink>
                </Nav.Item>
              )}
              {isLoggedIn && <Logout />}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;
