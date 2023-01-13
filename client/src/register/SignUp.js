// react hooks
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

// toast
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = () => {
    const regUser = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      status: true,
      photo: "",
      password: password,
    };

    if (firstName !== "" && lastName !== "" && username !== "") {
      if (password === confirmPassword) {
        axios
          .post("http://localhost:6969/users", regUser)
          .then(() => {
            navigate("/login");
            toast.success("You have successfully registered");
          })
          .catch((err) => {
            toast.error(err.code);
          });
      } else {
        toast.error("The password does not match");
      }
    } else {
      toast.error("Fill in the content");
    }
  };

  return (
    <div className="container register">
      <div className="register-card">
        <h1 className="text-center pb-3">Sign Up</h1>
        <Col xs="auto" className="mb-3">
          <label className="mb-1" htmlFor="firstName">
            First name
          </label>
          <InputGroup className="mb-2">
            <Form.Control
              id="firstName"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs="auto" className="mb-3">
          <label className="mb-1" htmlFor="lastName">
            Last name
          </label>
          <InputGroup className="mb-2">
            <Form.Control
              id="lastName"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </InputGroup>
        </Col>
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
        <Col xs="auto" className="mb-3">
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
        <Col xs="auto" className="mb-3">
          <label className="mb-1" htmlFor="password">
            Confirm password
          </label>
          <InputGroup className="mb-2">
            <Form.Control
              type="password"
              id="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Link to="/login" className="text-success">
          Do you have an account?
        </Link>
        <Col xs="auto">
          <button
            onClick={register}
            className="btn btn-success mt-4 mb-2 w-100"
          >
            Register
          </button>
        </Col>
      </div>
    </div>
  );
};

export default SignUp;
