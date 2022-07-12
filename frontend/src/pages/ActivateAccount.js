import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate ,useParams} from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import HeaderTop from "../components/HeaderTop";
import { useDispatch, useSelector } from "react-redux";
import * as authServices from "../services/authServices";
import { ToastContainer } from "react-toastify";
import { createNotification } from "../helper/notification";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import Footer from "../components/Footer";

const ActivateAccount = (props) => {
 
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const {token} = useParams()

  

  useEffect(() => {
   
    authServices.accountActivationAction(token)
        .then((result) => {
            console.log(result,"--result")
          if (result.status === 200) {
            console.log("result", result.message, "success");
            createNotification("success", result.message);
            setTimeout(() => {
                navigate("/");
            }, 2000);
          } else {
            setShowError(true)
            createNotification("error", result.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("valid");
    
  }, []);
  // console.log(user, "user");
  return (
    <>
      <HeaderTop />
      <div className="Login-wrapper">
        <Container>
          <div className="login-form">
            <h2 className="title">Email Verification</h2>
            <div className="form-wrapper">
            <h4>{showError ?"Some issue in activation":"Account Activated"}</h4>
            </div>
          </div>
          <ToastContainer autoClose={5000} />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ActivateAccount;
