import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import HeaderTop from "../components/HeaderTop";
import { ToastContainer } from "react-toastify";
import * as authServices from "../services/authServices";
import { createNotification } from "../helper/notification";
import { useNavigate } from "react-router-dom";
import * as businessServices from "../services/businessServices";
import Footer from "../components/Footer";
import states from "../config/State.json";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    businessName: "",
    firstName: "",
    phone: "",
    mobile: "",
    state: "",
    businessType: "",
    reffered: "",
  });
  const [bussType, setBussType] = useState([]);
  const [err, setErr] = useState({});
  const [userState, setUserState] = useState([]);

  const {
    email,
    password,
    firstName,
    phone,
    mobile,
    state,
    businessName,
    businessType,
    reffered,
  } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginPage = () => {
    navigate("/");
  };

  const validation = () => {
    const { email, password } = user;
    let isValid = true;
    const formError = {};
    const regex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    // let phoneno = /^\d{10}$/;
    let phoneNo = /^\d{10,15}$/;

    let pwd = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
    );

    if (!email) {
      isValid = false;
      formError["email"] = "Email is required";
    } else if (!regex.test(email)) {
      isValid = false;
      formError["email"] = "Please enter a valid email address";
    }
    if (!password) {
      isValid = false;
      formError["password"] = "Password is required";
    } else if (!pwd.test(password)) {
      isValid = false;
      formError["password"] =
        "Your password should have at least one special charachter, digits, uppercase and lowercase character, Length: 8+ character.";
    }
    if (!firstName) {
      isValid = false;
      formError["firstName"] = "Name is required";
    }
    if (!mobile) {
      isValid = false;
      formError["mobile"] = "Mobile number is required";
    } else if (!(mobile + "").match(phoneNo)) {
      isValid = false;
      formError["mobile"] = "Mobile number must be of 10-15 digits only";
    }
    if (!phone) {
      isValid = false;
      formError["phone"] = " Business phone is required";
    } else if (!(phone + "").match(phoneNo)) {
      isValid = false;
      formError["phone"] = "Business phone must be of 10-15 digits only";
    }
    if (!state) {
      isValid = false;
      formError["state"] = "Residence is required";
    }
    if (!businessType) {
      isValid = false;
      formError["businessType"] = "Business Type is required";
    }
    if (!businessName) {
      isValid = false;
      formError["businessName"] = "Business Name is required";
    }
    if (!reffered) {
      isValid = false;
      formError["reffered"] = "Referrence is required";
    }
    setErr(formError);
    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (validation()) {
      const response = await authServices.register(user);
      console.log(response, "response");
      if (response.status === 201) {
        createNotification("success", response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        createNotification("error", "Email Already Exists");
      }
    }
  };

  const getAllbusinessTypes = async () => {
    const response = await businessServices.getAllbussTypes();
    setBussType(response.data);
  };

  useEffect(() => {
    getAllbusinessTypes();
  }, []);

  useEffect(() => {
    setUserState(states.states);
  }, []);
  console.log(userState.states);
  return (
    <>
      <HeaderTop />
      <div className="Login-wrapper">
        <Container>
          <div className="Signup-form">
            <h2 className="title">SIGN UP TODAY!</h2>
            <div className="form-wrapper">
              <Form onSubmit={submitHandler}>
                <Row>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Business Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="businessName"
                        placeholder="Business Name"
                        value={businessName}
                        onChange={handleChange}
                      />
                      <span className="error">{err && err.businessName}</span>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Your Name"
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                      />
                      <span className="error">{err && err.firstName}</span>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={handleChange}
                      />
                      <span className="error">{err && err.email}</span>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                      />
                      <span className="error">{err && err.password}</span>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Business Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Business Phone"
                        value={phone}
                        onChange={handleChange}
                      />
                      <span className="error">{err && err.phone}</span>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={mobile}
                        onChange={handleChange}
                      />
                      <span className="error">{err && err.mobile}</span>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Your State of Residence</Form.Label>
                      <Form.Select name="state" onChange={handleChange}>
                        <option>Select Residence</option>
                        {userState &&
                          userState.length > 0 &&
                          userState.map((state) => (
                            <option key={state.name}>{state.name}</option>
                          ))}
                      </Form.Select>
                      <span className="error">{err && err.state}</span>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Business Type(Profession)</Form.Label>
                      <Form.Select name="businessType" onChange={handleChange}>
                        <option value="">Select Business Type</option>
                        {bussType &&
                          bussType.length > 0 &&
                          bussType.map((business) => (
                            <option value={business._id}>
                              {business.businessType}
                            </option>
                          ))}
                      </Form.Select>
                      <span className="error">{err && err.businessType}</span>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        How did you hear about Bi$i Boulevard?
                      </Form.Label>
                      <Form.Select name="reffered" onChange={handleChange}>
                        <option>Select Referrence</option>
                        <option value="Google">Google</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Referral">Referral</option>
                      </Form.Select>
                      <span className="error">{err && err.reffered}</span>
                    </Form.Group>
                  </Col>
                </Row>
                <Button type="submit">SignUp</Button>
              </Form>
            </div>
            <div className="newaccount">
              Already have an account ?<Link to="/"> Login</Link>
            </div>
          </div>
        </Container>
      </div>

      <ToastContainer />
      <Footer />
    </>
  );
};

export default Signup;
