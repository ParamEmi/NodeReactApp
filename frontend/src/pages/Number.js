import React, { useState, useEffect } from "react";
import { Container, Tab, Tabs, Row, Col, Table } from "react-bootstrap";
import HeaderTop from "../components/HeaderTop";
import Sidebarmenu from "../components/Sidebarmenu";
import { BsQuestionLg } from "react-icons/bs";
import Footer from "../components/Footer";
import { Chart } from "react-google-charts";
import * as getCompanyGoalservice from "../../src/services/goalCompanyBudgetService";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const data = [
  ["Task", "week to date"],
  ["Blue", 33.7],
  ["Red", 42],
  ["Yellow", 22.3],
];
const options = {
  pieHole: 0.0,
  is3D: false,
  width: 500,
  height: 400,
  legend: {
    position: "top",
    alignment: "center",
    textStyle: { color: "#17533f", fontSize: 16, bold: true },
  },
  pieStartAngle: 100,
};
const dataset = [
  ["Month", "My First dataset"],
  ["January", 50],
  ["February", 85],
  ["March", 60],
  ["April", 80],
  ["may", 70],
  ["June", 75],
  ["July", 90],
  ["August", 25],
  ["September", 15],
  ["October", 135],
  ["November", -45],
  ["December", 11],
];
const datasetoptions = {
  curveType: "function",
  legend: {
    position: "top",
    alignment: "center",
  },
};

const Number = () => {
  let { id } = useParams();
  let [goalResult, setGoalResult] = useState("");
  let [claculateHour, setCalculateHour] = useState("");
  const tokenResponse = useSelector((state) => state.auth.token);

  let getGoalById = async () => {
    const response = await getCompanyGoalservice.GoalsById(id, tokenResponse);
    if (response.data.data) {
      response.data &&
        response.data.data.map((val) => {
          setGoalResult(val.calculatedgoals);
        });
    }
    // setGoalResult(response.data.data);
    // setCalculateHour(response.data.Goals_Budget.companyBudget);
  };

  useEffect(() => {
    getGoalById();
  }, [tokenResponse]);
  console.log(goalResult);

  console.log(goalResult, "goalResult");
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
                        <span className="icon">
                          {" "}
                          {goalResult && goalResult.weeklyClients === 0 ? (
                            0
                          ) : goalResult.weeklyClients > 0 ? (
                            goalResult.weeklyClients
                          ) : (
                            <BsQuestionLg />
                          )}
                        </span>
                        <h4>Weekly Goals</h4>
                      </div>
                    </li>
                    <li>
                      <div className="goalbox">
                        <span className="icon">
                          {" "}
                          {goalResult && goalResult.monthlyClients === 0 ? (
                            0
                          ) : goalResult.monthlyClients > 0 ? (
                            goalResult.monthlyClients
                          ) : (
                            <BsQuestionLg />
                          )}
                        </span>
                        <h4>Monthly Goals</h4>
                      </div>
                    </li>
                    <li>
                      <div className="goalbox">
                        <span className="icon">
                          {" "}
                          {goalResult && goalResult.yearlyClients === 0 ? (
                            0
                          ) : goalResult.yearlyClients > 0 ? (
                            goalResult.yearlyClients
                          ) : (
                            <BsQuestionLg />
                          )}
                        </span>
                        <h4>
                          Yearly <br />
                          Goals
                        </h4>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="ds-goal-table">
                  <div className="number-tab-wrapper">
                    <Tabs defaultActiveKey="weektodate" className="mb-3">
                      <Tab eventKey="weektodate" title="Week to Date">
                        <div className="tab-detail">
                          <div className="numberchart">
                            <Row>
                              <Col xs={6}>
                                <Chart
                                  chartType="LineChart"
                                  width="100%"
                                  height="400px"
                                  data={dataset}
                                  options={datasetoptions}
                                />
                              </Col>
                              <Col xs={6}>
                                <Chart
                                  chartType="PieChart"
                                  width="100%"
                                  height="400px"
                                  data={data}
                                  options={options}
                                />
                              </Col>
                            </Row>
                          </div>
                          <div className="number-table">
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Category</th>
                                  <th>Projected </th>
                                  <th>Actual</th>
                                  <th>Goal Reached?</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th>Number of Clients</th>
                                  {/* <td>{goalResult.weeklyClients}</td> */}
                                  <td>??</td>

                                  <td>??</td>
                                  <td>??</td>
                                </tr>
                                <tr>
                                  <th>Hour Worked</th>
                                  {/* <td>{claculateHour.workPerDay}</td> */}
                                  <td>??</td>
                                  <td>??</td>
                                  <td>??</td>
                                </tr>
                                <tr>
                                  <th>Bottles of product used</th>
                                  <td>$??</td>
                                  <td>??</td>
                                  <td>??</td>
                                </tr>
                                <tr>
                                  <th>Gross Profit</th>
                                  <td>$??</td>
                                  <td>??</td>
                                  <td>??</td>
                                </tr>
                                <tr>
                                  <th>Net Profit</th>
                                  <td>$??</td>
                                  <td>??</td>
                                  <td>??</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </Tab>

                      <Tab eventKey="monthtodate" title="Month to date">
                        <div className="tab-detail">
                          <div className="numberchart">
                            <Row>
                              <Col xs={6}>
                                <Chart
                                  chartType="LineChart"
                                  width="100%"
                                  height="400px"
                                  data={dataset}
                                  options={datasetoptions}
                                />
                              </Col>
                              <Col xs={6}>
                                <Chart
                                  chartType="PieChart"
                                  width="100%"
                                  height="400px"
                                  data={data}
                                  options={options}
                                />
                              </Col>
                            </Row>
                          </div>
                          <div className="number-table">
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Category</th>
                                  <th>Projected </th>
                                  <th>Actual</th>
                                  <th>Goal Reached?</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th>Number of Clients</th>
                                  {/* <td>{goalResult.monthlyClients}</td> */}
                                  <td>??</td>
                                  <td>??</td>
                                </tr>
                                <tr>
                                  <th>Hour Worked</th>
                                  {/* <td>{claculateHour.workPerDay}</td> */}
                                  <td>??</td>
                                  <td>??</td>
                                </tr>
                                <tr>
                                  <th>Bottles of product used</th>
                                  <td>$??</td>
                                  <td>??</td>
                                  <td>??</td>
                                </tr>
                                <tr>
                                  <th>Gross Profit</th>
                                  <td>$??</td>
                                  <td>??</td>
                                  <td>??</td>
                                </tr>
                                <tr>
                                  <th>Net Profit</th>
                                  <td>$??</td>
                                  <td>??</td>
                                  <td>??</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </Tab>

                      <Tab eventKey="yeartodate" title="Year to Date">
                        <div className="tab-detail">
                          <div className="numberchart">
                            <Row>
                              <Col xs={6}>
                                <Chart
                                  chartType="LineChart"
                                  width="100%"
                                  height="400px"
                                  data={dataset}
                                  options={datasetoptions}
                                />
                              </Col>
                              <Col xs={6}>
                                <Chart
                                  chartType="PieChart"
                                  width="100%"
                                  height="400px"
                                  data={data}
                                  options={options}
                                />
                              </Col>
                            </Row>
                          </div>
                          <div className="number-table">
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Category</th>
                                  <th>Projected </th>
                                  <th>Actual</th>
                                  <th>Goal Reached?</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th>Number of Clients</th>
                                  {/* <td>{goalResult.yearlyClients}</td> */}
                                  <td>??</td>
                                  <td>??</td>
                                </tr>
                                <tr>
                                  <th>Hour Worked</th>
                                  {/* <td>{claculateHour.workPerDay}</td> */}
                                  <td>??</td>
                                  <td>??</td>
                                </tr>
                                <tr>
                                  <th>Bottles of product used</th>
                                  <td>$??</td>
                                  <td>??</td>
                                  <td>??</td>
                                </tr>
                                <tr>
                                  <th>Gross Profit</th>
                                  <td>$??</td>
                                  <td>??</td>
                                  <td>??</td>
                                </tr>
                                <tr>
                                  <th>Net Profit</th>
                                  <td>$??</td>
                                  <td>??</td>
                                  <td>??</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Number;
