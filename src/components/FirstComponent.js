// react hooks
// import { useEffect } from "react";

// bootstrap
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";

// react router dom
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// icons
// import { FiMoon, FiSun } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";

// toast
import { toast } from "react-toastify";
// import axios from "axios";

function NavScrollExample() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logOut = () => {
    localStorage.removeItem("user");
    toast.warning("You are logged out");
    navigate("/login");
  };

  return (
    <Navbar
      bg="dark"
      expand="lg"
      className={
        pathname === "/signUp" || pathname === "/login"
          ? "d-none"
          : "py-4 custom-navbar"
      }
    >
      <Container fluid>
        <Link className="text-white mx-2 text-decoration-none" to="/">
          <h2 className="text-white">Abula</h2>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link
              className={
                pathname === "/"
                  ? "text-warning mx-2 text-decoration-none"
                  : "text-white mx-2 text-decoration-none"
              }
              to="/"
            >
              DashBoard
            </Link>
            <Link
              className={
                pathname === "/users"
                  ? "text-warning mx-2 text-decoration-none"
                  : "text-white mx-2 text-decoration-none"
              }
              to="/users"
            >
              Users
            </Link>
            <Link
              className={
                pathname === "/tasks"
                  ? "text-warning mx-2 text-decoration-none"
                  : "text-white mx-2 text-decoration-none"
              }
              to="/tasks"
            >
              Tasks
            </Link>
            <Link
              className={
                pathname === "/statistics"
                  ? "text-warning mx-2 text-decoration-none"
                  : "text-white mx-2 text-decoration-none"
              }
              to="/statistics"
            >
              Statistics
            </Link>
          </Nav>
          {user && user !== null ? (
            <div className="d-flex align-items-center justify-content-between">
              <div className="text-white">
                <h4 className="username">{user.username}</h4>
                <p className="user-first-name">
                  {user.first_name + " " + user.last_name}
                </p>
              </div>
              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    <BiUserCircle
                      className="text-white mb-1 user-data"
                      size="40"
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item
                      className="text-white w-100"
                      onClick={logOut}
                    >
                      Log out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          ) : (
            <Form className="d-flex justify-content-between register-actions">
              <Link to="/login">
                <Button variant="success" className="mr-1">
                  Login
                </Button>
              </Link>
              <Link to="/signUp">
                <Button variant="primary">SignUp</Button>
              </Link>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
