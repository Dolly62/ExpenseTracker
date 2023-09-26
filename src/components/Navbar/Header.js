import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Logout from "../Authentication.js/Logout";
import classes from "./Header.module.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import Theme from "../UI/Theme";

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
            Xpense <span style={{ fontSize: "0.7rem" }}>Tracker</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center"
          >
            <Nav className={classes.navbar}>
                <Nav.Item
                  className="p-2 m-1 mx-2"
                  style={{
                    fontSize: "1.2rem",
                    width: "6rem",
                  }}
                >
                  <NavLink to="/home" activeClassName={classes.active}>
                    Home
                  </NavLink>
                </Nav.Item>
              {isLoggedIn && (
                <Nav.Item
                  className="p-2 m-1 mx-2"
                  style={{
                    fontSize: "1.2rem",
                    width: "6rem",
                  }}
                >
                  <NavLink to="/expense" activeClassName={classes.active}>
                    Expense
                  </NavLink>
                </Nav.Item>
              )}
              {isLoggedIn && (
                <Nav.Item
                  className="p-2 m-1 mx-2"
                  style={{
                    fontSize: "1.2rem",
                    width: "6rem",
                  }}
                >
                  <NavLink to="/profile" activeClassName={classes.active}>
                    Profile
                  </NavLink>
                </Nav.Item>
              )}
              {!isLoggedIn && (
                <Nav.Item
                  className="p-2 m-1 mx-2"
                  style={{
                    fontSize: "1.2rem",
                    width: "6rem",
                  }}
                >
                  <NavLink to="/login" activeClassName={classes.active}>
                    Login
                  </NavLink>
                </Nav.Item>
              )}
              {isLoggedIn && <Logout />}
              <Nav.Item
                  className="p-2 m-1 mx-2"
                >
              <Theme />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;
