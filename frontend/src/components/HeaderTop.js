import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import logo from "../assets/img/bisi_logo.png";
import affliatedimg from "../assets/img/affilliatefeature.png";
import { useSelector } from "react-redux";

const HeaderTop = () => {
  const userName = useSelector(
    (state) =>
      state && state.auth && state.auth.user && state.auth.user.firstName
  );
  const userId = localStorage.getItem("front_user_id");
  return (
    <>
      <div className="headertop-wrapper">
        <Container>
          <div className="headerbar d-flex justify-content-between align-items-center">
            <div className="logobar">
              <Link to="/dashboard">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            {userId ? (
              <div className="userbar">
                <span>Hello {userName}</span>
                {/* <img src={affliatedimg} alt="img" /> */}
              </div>
            ) : (
              " "
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default HeaderTop;
