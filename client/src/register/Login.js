import React, { useState } from "react";

// css
import "./register.css";

// bootstrap
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// react router dom
import { Link, useNavigate } from "react-router-dom";

// axios
import axios from "axios";

// toastification
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = () => {
    if (username !== "" || password !== "") {
      axios
        .get(`http://localhost:6969/users/?username_like=${username}`)
        .then((res) => {
          const response = res.data;
          if (response.length === 0) {
            toast.error("No such user exists");
          } else {
            if (
              response[0].username === username &&
              response[0].password === password
            ) {
              if (response[0].status) {
                localStorage.setItem("user", JSON.stringify(response[0]));
                toast.success(`Welcome  ${username}!`);
                navigate("/");
              } else {
                toast.error("Sorry, but this user is not active");
              }
            } else {
              toast.error("Username or password is not a true");
            }
          }
        })
        .catch((err) => {
          toast.error(err.code);
        });
    } else {
      toast.error("Enter your username and password");
    }
  };

  return (
    <div className="container register">
      <div className="register-card">
        <h1 className="text-center pb-3">Login</h1>
        <Col xs="auto" className="mb-3">
          <label className="mb-1" htmlFor="username">
            Username
          </label>
          <InputGroup className="mb-2">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col>
          <label className="mb-1" htmlFor="password">
            Password
          </label>
          <InputGroup className="mb-2">
            <Form.Control
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Link to="/signUp" className="text-success">
          Don't have an account?
        </Link>
        <Col xs="auto">
          <button onClick={login} className="btn btn-success mt-4 mb-2 w-100">
            Login
          </button>
        </Col>
      </div>
    </div>
  );
};

export default Login;
