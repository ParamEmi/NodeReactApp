import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import HeaderTop from "../components/HeaderTop";
import Sidebarmenu from "../components/Sidebarmenu";
import { BsQuestionLg } from "react-icons/bs";
import Videopopup from "../components/videopopup";
import Footer from "../components/Footer";
import * as userServices from "../services/userServices";
const Dashboard = () => {
  const userID = useSelector(
    (state) => state && state.auth && state.auth.user && state.auth.user._id
  );
  const [userStatus, setUserStatus] = useState("");
  let id = userID;

  console.log(userID, "userid");

  const getUserById = async () => {
    const response = await userServices.GetUserByID(id);
    setUserStatus(response.data.loginStatus);
  };
  useEffect(() => {
    getUserById();
  }, [userID]);

  return (
    <>
      <HeaderTop />
      <div className="dashboard-wrapper">
        <Container>
          <div className="dashboard-content">
            <div className="sidebarmenu">
              <Sidebarmenu />
            </div>
            <div className="ds-content">
              <h1 className="page-title">Your Progress</h1>

              <div className="ds-goal-section">
                <div className="goal-heading">
                  <ul>
                    <li>
                      <div className="goalbox">
                        <BsQuestionLg />
                        <span>Goal 1</span>
                      </div>
                    </li>
                    <li>
                      <div className="goalbox">
                        <BsQuestionLg />
                        <span>Goal 2</span>
                      </div>
                    </li>
                    <li>
                      <div className="goalbox">
                        <BsQuestionLg />
                        <span>Goal 3</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="ds-goal-table">
                  <div className="dstable">
                    <ul>
                      <li>
                        <div className="dslist">
                          <div className="title">Personal Budget Form</div>
                          <div className="dsbtn">
                            <Button
                              className="startbtn"
                              as={Link}
                              to="/Personal_budget_income"
                            >
                              Start
                            </Button>{" "}
                            <Button
                              className="startbtn"
                              as={Link}
                              to="/Personal_budget_income?summery=1"
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {userStatus === 0 ? <Videopopup /> : ""}
      <Footer />
    </>
  );
};

export default Dashboard;
