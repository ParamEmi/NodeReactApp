import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as authActions from "../store/action/authAction";
import { Container, Form, Button } from "react-bootstrap";
import HeaderTop from "../components/HeaderTop";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createNotification } from "../helper/notification";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import Footer from "../components/Footer";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState({});
  const [password, setPassword] = useState("");

  const formValidation = () => {
    // const { email, password } = user;
    const regex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const pwd = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
    );
    let formErrors = {};
    let isValid = true;
    if (!email) {
      isValid = false;
      formErrors["email"] = "Email is required";
    } else if (!regex.test(email)) {
      isValid = false;
      formErrors["email"] = "Please enter a valid email address";
    }
    if (!password) {
      isValid = false;
      formErrors["password"] = "Password is required";
    }
    // else if (!pwd.test(password)) {
    //   isValid = false;
    //   formErrors["password"] = "Your password should have at least one special charachter, digits, uppercase and lowercase charachter. Length: 8+ ch-ers.";

    // }

    setErr(formErrors);
    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      try {
        const data = {
          email,
          password,
        };
        dispatch(authActions.loginUser(data, navigate));
      } catch (err) {
        console.log(err.message);
        createNotification("error", err.message);
      }
    }
  };
  // console.log(user, "user");
  return (
    <>
      <HeaderTop />
      <div className="Login-wrapper">
        <Container>
          <div className="login-form">
            <h2 className="title">LOGIN</h2>
            <div className="form-wrapper">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitHandler(e);
                }}
              >
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="error">{err && err.email}</span>
                </Form.Group>

                <Form.Group className="mb-3">
                  <div className="password-label">
                    {" "}
                    <Form.Label>Password</Form.Label>
                  </div>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="error">{err && err.password}</span>
                  <div className="password-label">
                    <span className="forgetpas">
                      {" "}
                      <ForgotPassword />
                    </span>
                  </div>
                </Form.Group>

                <Button type="submit">Login</Button>
              </Form>
            </div>
            <div className="newaccount">
              Don't have an account yet? <Link to="/Signup"> SignUp</Link>
            </div>
          </div>
          <ToastContainer autoClose={5000} />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Login;
