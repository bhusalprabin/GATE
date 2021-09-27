import React, { useEffect } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../pages/HomePage/Homepage";
import logo from "../assets/image/logo.png";
import { UserContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

const TopNavbar = () => {
  const { state, dispatch } = useContext(UserContext);

  const token = localStorage.getItem("isLogged");

  useEffect(() => {
    if (token === "1") {
      dispatch({ type: "USER", payload: 1 });
    } else if (token === "2") {
      dispatch({ type: "USER", payload: 2 });
    } else if (token === "5") {
      dispatch({ type: "ADMIN", payload: 5 });
    } else {
      dispatch({ type: "USER", payload: 0 });
    }
  });

  const StudentLog = () => {
    return (
      <Navbar expand="lg" className=" custom-homepage-nav-container">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <AiOutlineMenuFold className="homepage-header-nav-toggle" />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="homepage-nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/search" className="homepage-nav-link">
              Find A Tutor
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/student/dashboard"
              className="homepage-nav-link"
            >
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/user/logout" className="homepage-nav-link">
              Logout
            </Nav.Link>
            {/* <NavDropdown
              title="Profile"
              id="basic-nav-dropdown"
              className="homepage-nav-link"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  const TutorLog = () => {
    return (
      <Navbar expand="lg" className=" custom-homepage-nav-container">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <AiOutlineMenuFold className="homepage-header-nav-toggle" />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="homepage-nav-link">
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/tutor/dashboard"
              className="homepage-nav-link"
            >
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/user/logout" className="homepage-nav-link">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  const AdminLog = () => {
    return (
      <Navbar expand="lg" className=" custom-homepage-nav-container">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <AiOutlineMenuFold className="homepage-header-nav-toggle" />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="homepage-nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/admin" className="homepage-nav-link">
              Admin Dash
            </Nav.Link>
            <Nav.Link as={Link} to="/user/logout" className="homepage-nav-link">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  const ShowNav = () => {
    if (state === 1) {
      return <StudentLog />;
    } else if (state === 2) {
      return <TutorLog />;
    } else if (token === "5") {
      return <AdminLog />;
    } else {
      return (
        <Navbar expand="lg" className=" custom-homepage-nav-container">
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <AiOutlineMenuFold className="homepage-header-nav-toggle" />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/" className="homepage-nav-link">
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/students/login"
                className="homepage-nav-link"
              >
                Login
              </Nav.Link>
              {/* <Nav.Link
                as={Link}
                to="/students/signup"
                className="homepage-nav-link"
              >
                Signup
              </Nav.Link> */}
              <Nav.Link as={Link} to="/search" className="homepage-nav-link">
                Find A Tutor
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/tutor/login"
                className="homepage-nav-link nav-link-tutor"
              >
                Are You A Tutor?
              </Nav.Link>

              {/* <NavDropdown
                title="Info"
                id="basic-nav-dropdown"
                className="homepage-nav-link"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  };
  return <ShowNav />;
};

export default TopNavbar;
