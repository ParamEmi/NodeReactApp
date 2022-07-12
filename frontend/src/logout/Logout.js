import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as userService from "../../src/services/userServices";

const Logout = () => {
  console.log("logout");
  const navigate = useNavigate();

  const logOut = async () => {
    localStorage.removeItem("front_user_token");
    localStorage.removeItem("front_user_id");
    localStorage.removeItem("business_Type_id");

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  useEffect(() => {
    logOut();
  }, []);
};

export default Logout;
