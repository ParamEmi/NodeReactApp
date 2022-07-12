import React, { useState, useEffect } from "react";
import { Container, Col, Form, Row, Button } from "react-bootstrap";
import HeaderTop from "../components/HeaderTop";
import Sidebarmenu from "../components/Sidebarmenu";
import { BsQuestionLg } from "react-icons/bs";
import Footer from "../components/Footer";
import { getBusinessByUserAction } from "../services/userGoalServices";
import { BusinessServiceModal } from "../modals/BusinessService";
import GoalsServiceform from "./GoalsServiceform";
import { useDispatch, useSelector } from "react-redux";
import { saveGoalBudgetAction } from "../services/goalCompanyBudgetService";
import { useNavigate } from "react-router-dom";
import { createNotification } from "../helper/notification";
import { ToastContainer } from "react-toastify";
import { GoalsById } from "../services/goalCompanyBudgetService";
import * as commonService from "../../src/services/commonService";

const Goals = () => {
  const userId = useSelector(
    (state) => state && state.auth && state.auth.user && state.auth.user._id
  );

  const [companyBudgetObject, setCompanyBudgetObject] = React.useState("");
  const [calculate, setCalculate] = useState(false);
  const navigate = useNavigate();

  const [calculatedgoals, setCalculatedGoals] = useState({
    yearlyClients: 0,
    monthlyClients: 0,
    weeklyClients: 0,
    hoursPerDay: 0,
  });
  let [companyBudget, setComapanyBudget] = React.useState({
    revenueEarn: "50000",
    workPerDay: "",
    workPerWeek: "",
  });
  const [error, setError] = useState([]);
  const [yearlyIncome, setYearlyIncome] = useState("");
  const [error1, setError1] = useState([]);

  let [service, setService] = useState([]);
  let [serviceNew, setServiceNew] = useState([
    {
      serviceCharge: "",
      serviceHours: "",
      serviceMinute: "",
      checked: false,
    },
  ]);

  const [serviceCount, setServiceCount] = useState([]);

  const handlecompanyBudget = (e) => {
    const { name, value } = e.target;
    const data = e.target.validity.valid ? value : undefined;
    if (data !== undefined) {
      setComapanyBudget({
        ...companyBudget,
        [name]: value,
      });
    }
  };

  const [atleastOne, setAtleastOne] = useState(true);

  const [totalChargeService, setTotalChargeService] = useState();

  const idResponse = useSelector((state) => state.auth.user);

  const tokenResponse = useSelector((state) => state.auth.token);

  const validation = () => {
    const service = [...serviceNew];
    let formErrors = [];
    const { revenueEarn, workPerDay, workPerWeek } = companyBudget;
    let isValid = true;
    const formError = {};
    let onlyNumbers = /^[0-9]+$/;
    if (companyBudget) {
      if (!revenueEarn) {
        isValid = false;
        formError["revenueEarn"] = "Revenue Earn is required";
      } else if (!revenueEarn.match(onlyNumbers)) {
        isValid = false;
        formError["revenueEarn"] = "Revenue Earn must be numbers only";
      }
      if (!workPerDay) {
        isValid = false;
        formError["workPerDay"] = "Work Per Day is required";
      } else if (workPerDay == "Select") {
        isValid = false;
        formError["workPerDay"] = "Work Per Day is required";
      }
      if (!workPerWeek) {
        isValid = false;
        formError["workPerWeek"] = "Work Per Week is required";
      } else if (workPerWeek == "Select") {
        isValid = false;
        formError["workPerWeek"] = "Work Per Week is required";
      }
    }

    let isAtleastOne = false;
    service.filter((val, index) => {
      let obj = {};
      if (val.checked) {
        isAtleastOne = true;

        if (!val.serviceHours || val.serviceHours.length === 0) {
          obj.serviceHours = "Service Hours is Required";
          isValid = false;
        }
        if (!val.serviceCharge || val.serviceCharge.length === 0) {
          obj.serviceCharge = "Service Charge is Required";
          isValid = false;
        }
        // if (!val.serviceMinute || val.serviceMinute.length === 0) {
        //   obj.serviceMinute = "Service Minute is Required";
        //   isValid = false;
        // }
        if (!isValid) {
          formErrors[index] = obj;
        }
      }
    });
    setAtleastOne(isAtleastOne);

    setError(formError);
    setError1(formErrors);

    return isValid;
  };
  const getServiceByUser = async (tokenResponse) => {
    const response = await getBusinessByUserAction(tokenResponse);
    if (response && response.data) {
      setServiceCount(response.data.service);
      setService(response.data.service);
      setCompanyBudgetObject(response.data);
    }
  };

  const getGoalsBudget = async () => {
    const response = await GoalsById(userId, tokenResponse);

    if (
      response &&
      response.data &&
      response.data.data &&
      response.data.data.length === 0
    ) {
      getBusinessByUserAction(tokenResponse).then((res) => {
        setServiceNew(res.data.service);
      });
    } else {
      let Goals_Budget = response.data.data;
      if (Goals_Budget) {
        Goals_Budget &&
          Goals_Budget.length > 0 &&
          Goals_Budget.map((val) => {
            return setComapanyBudget(val.companyBudget);
          });
      }
      let arr = [];

      setAtleastOne(true);

      if (Goals_Budget) {
        Goals_Budget &&
          Goals_Budget.length > 0 &&
          Goals_Budget.map((val, index) => {
            setCalculatedGoals(val.calculatedgoals);

            if (val.service.length > 0) {
              val.service.map((val1, index1) => {
                return arr.push(val1);
              });
            }
          });

        setServiceNew(arr);
      }
    }
  };
  useEffect(() => {
    getGoalsBudget();
  }, [userId]);

  const handleService = (e, serviceIndex) => {
    const data = e.target.validity.valid ? e.target.value : undefined;
    let serviceArray = [...serviceNew];
    console.log(serviceArray, "serviceArray");
    if (e.target.name === "checked") {
      serviceArray[serviceIndex][e.target.name] =
        !serviceArray[serviceIndex][e.target.name];
    } else {
      serviceArray[serviceIndex][e.target.name] = e.target.value;
    }

    if (data !== undefined) {
      setServiceNew(serviceArray);
    }
  };

  const handleCalculate = async () => {
    if (validation() && atleastOne) {
      setCalculate(true);
      let arr = [];
      let arr1 = [];
      let arr2 = [];
      //revenu
      let revenue = parseInt(companyBudget && companyBudget.revenueEarn);
      //working service hours
      let totalServiceHours = 0;
      parseInt(
        serviceNew &&
          serviceNew.length > 0 &&
          serviceNew.filter((val) => {
            if (val.checked === true) {
              return arr.push(val);
            }
          })
      );

      parseInt(
        arr.map((val) => {
          if (val.serviceHours) {
            return (totalServiceHours += parseInt(val.serviceHours));
          }
        })
      );

      let serviceHoursToMinutes = totalServiceHours * 60;
      let totalServiceMinutes = 0;
      parseInt(
        serviceNew &&
          serviceNew.length > 0 &&
          serviceNew.filter((val) => {
            if (val.checked == true) {
              return arr1.push(val);
            }
          })
      );

      arr1.map((val) => {
        if (val.serviceMinute) {
          return (totalServiceMinutes += parseInt(val.serviceMinute));
        }
      });

      let minutesForWorkPerDay = companyBudget && companyBudget.workPerDay * 60;

      let TotalMinutesForServices = serviceHoursToMinutes + totalServiceMinutes;

      // let hoursPerDay = Math.round(
      //   minutesForWorkPerDay / TotalMinutesForServices
      // );
      let hoursPerDay = minutesForWorkPerDay / TotalMinutesForServices;

      let totalServiceCharges = 0;
      let obj2 = {};
      serviceNew &&
        serviceNew.length > 0 &&
        serviceNew.filter((val) => {
          if (val.checked == true) {
            return arr2.push(val);
          }
        });

      arr2.map((val) => {
        if (val.serviceCharge) {
          totalServiceCharges += parseInt(val.serviceCharge);
        }
      });

      let totalClientCharges = parseInt(totalServiceCharges * hoursPerDay);

      let yearlyClients = revenue / totalClientCharges;

      let monthlyClients = yearlyClients / 12;

      let weeklyClients = monthlyClients / 4;

      let obj = {
        yearlyClients: Math.round(yearlyClients),
        monthlyClients: Math.round(monthlyClients),
        weeklyClients: Math.round(weeklyClients),
        hoursPerDay: Math.round(hoursPerDay),
        totalServiceCharges: totalServiceCharges,
      };
      obj2.cal = obj;
      let calculategoalBudget = {
        companyBudget: companyBudget,
        service: serviceNew,
        calculatedgoals: obj2.cal,
      };

      if (TotalMinutesForServices > minutesForWorkPerDay) {
        createNotification(
          "error",
          "Total working hours should be greater than total working hours of service"
        );
      } else {
        const saveGoalBudget = await saveGoalBudgetAction(
          calculategoalBudget,
          tokenResponse
        );
        if (saveGoalBudget.status === 200) {
          createNotification("success", saveGoalBudget.data.message);
        }
        getGoalsBudget();
      }
      // });
    } else {
      createNotification("error", "Validate the form first");
    }
    let totalServiceCharge = 0;
    serviceNew &&
      serviceNew.length > 0 &&
      serviceNew
        .filter((val) => val.checked == true)
        .map((val) => (totalServiceCharge += parseInt(val.serviceCharge)));
    setTotalChargeService(totalServiceCharge);
  };

  const handleNumber = () => {
    navigate(`/number/${idResponse._id}`);
  };

  const getFunction = () => {
    getGoalsBudget();
  };

  const revenuData = async () => {
    const repsonse = await commonService.getPersonalBudgetAction(tokenResponse);
    setYearlyIncome(
      repsonse &&
        repsonse.personalBudget &&
        repsonse.personalBudget.summaryObject
        ? repsonse.personalBudget.summaryObject.netAnnualRemainings
        : ""
    );
  };

  useEffect(() => {
    revenuData();
  }, []);

  useEffect(() => {
    revenuData();
  }, [tokenResponse]);

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
                          {calculatedgoals &&
                          calculatedgoals.weeklyClients === 0 &&
                          calculatedgoals.monthlyClients === 0 &&
                          calculatedgoals.yearlyClients === 0 &&
                          calculatedgoals.hoursPerDay === 0 ? (
                            <BsQuestionLg />
                          ) : calculatedgoals.weeklyClients === 0 ? (
                            0
                          ) : calculatedgoals.weeklyClients > 0 ? (
                            calculatedgoals.weeklyClients
                          ) : null}
                          <h4>Weekly Goals</h4>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="goalbox">
                        <span className="icon">
                          {calculatedgoals &&
                          calculatedgoals.weeklyClients === 0 &&
                          calculatedgoals.monthlyClients === 0 &&
                          calculatedgoals.yearlyClients === 0 &&
                          calculatedgoals.hoursPerDay === 0 ? (
                            <BsQuestionLg />
                          ) : calculatedgoals.monthlyClients === 0 ? (
                            0
                          ) : calculatedgoals.monthlyClients > 0 ? (
                            calculatedgoals.monthlyClients
                          ) : null}
                          <h4>Monthly Goals</h4>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="goalbox">
                        <span className="icon">
                          {calculatedgoals &&
                          calculatedgoals.weeklyClients === 0 &&
                          calculatedgoals.monthlyClients === 0 &&
                          calculatedgoals.yearlyClients === 0 &&
                          calculatedgoals.hoursPerDay === 0 ? (
                            <BsQuestionLg />
                          ) : calculatedgoals.yearlyClients === 0 ? (
                            0
                          ) : calculatedgoals.yearlyClients > 0 ? (
                            calculatedgoals.yearlyClients
                          ) : null}
                          <h4>
                            {" "}
                            Yearly <br /> Goals
                          </h4>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="ds-goal-table">
                  <div className="bgform">
                    <div className="form-wrapper">
                      <Form>
                        <Row>
                          <Col xs={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                How much addtional business revenue do you want
                                to earn beyond your personal revenue of: $
                                {yearlyIncome ? yearlyIncome : ""}
                              </Form.Label>
                              <Form.Control
                                type="text"
                                pattern="[0-9]*"
                                name="revenueEarn"
                                value={companyBudget.revenueEarn}
                                onChange={handlecompanyBudget}
                              />
                              <span className="error">
                                {error && error.revenueEarn}
                              </span>
                            </Form.Group>
                          </Col>
                          <Col xs={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                How many hours do you want to work a day?
                              </Form.Label>
                              <Form.Select
                                name="workPerDay"
                                value={companyBudget.workPerDay}
                                onChange={handlecompanyBudget}
                              >
                                <option>Select</option>
                                <option value="1">1 Hour</option>
                                <option value="2">2 Hours</option>
                                <option value="3">3 Hours</option>
                                <option value="4">4 Hours</option>
                                <option value="5">5 Hours</option>
                                <option value="6">6 Hours</option>
                                <option value="7">7 Hours</option>
                                <option value="8">8 Hours</option>
                                <option value="9">9 Hours</option>
                                <option value="10">10 Hours</option>
                              </Form.Select>
                              <span className="error">
                                {error && error.workPerDay}
                              </span>
                            </Form.Group>
                          </Col>
                          <Col xs={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                How many days do you want to work a week?
                              </Form.Label>
                              <Form.Select
                                name="workPerWeek"
                                value={companyBudget.workPerWeek}
                                onChange={handlecompanyBudget}
                              >
                                <option>Select</option>
                                <option value="1">1 Day</option>
                                <option value="2">2 Days</option>
                                <option value="3">3 Days</option>
                                <option value="4">4 Days</option>
                                <option value="5">5 Days</option>
                                <option value="6">6 Days</option>
                                <option value="7">7 Days</option>
                              </Form.Select>
                              <span className="error">
                                {error && error.workPerWeek}
                              </span>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                    <div className="service-provided">
                      <h2 className="title">What Services do you provide?</h2>
                      <div className="service-list">
                        {serviceNew &&
                          serviceNew.length > 0 &&
                          serviceNew.map((val, index) => {
                            return (
                              <GoalsServiceform
                                index={index}
                                service={val}
                                serviceName={val.service}
                                handleService={handleService}
                                error1={error1}
                                tokenResponse={tokenResponse}
                              />
                            );
                          })}
                      </div>
                    </div>

                    <div className="gd-btn">
                      <BusinessServiceModal
                        getServiceByUser={getServiceByUser}
                        getFunction={getFunction}
                      />
                      <Button onClick={handleCalculate}>Calculate</Button>
                      <Button>Reset</Button>
                    </div>

                    <div className="personal-budget-box">
                      <h2>
                        {" "}
                        Based on your personal budget and your goal above,here
                        what we suggest you need to reach them{" "}
                      </h2>
                      <h1>
                        Total amount that can be earned per day for these
                        services $
                        {calculatedgoals.totalServiceCharges
                          ? calculatedgoals.totalServiceCharges
                          : 0}
                      </h1>
                      <div className="average-list">
                        <ul className="avgicon">
                          <li>
                            <span className="icon">
                              {calculatedgoals &&
                              calculatedgoals.weeklyClients === 0 &&
                              calculatedgoals.monthlyClients === 0 &&
                              calculatedgoals.yearlyClients === 0 &&
                              calculatedgoals.hoursPerDay === 0 ? (
                                <BsQuestionLg />
                              ) : calculatedgoals.weeklyClients === 0 ? (
                                0
                              ) : calculatedgoals.weeklyClients > 0 ? (
                                calculatedgoals.weeklyClients
                              ) : null}
                            </span>
                            <span className="cl-name">Clients Weekly</span>
                          </li>
                          <li>
                            <span className="icon">
                              {calculatedgoals &&
                              calculatedgoals.weeklyClients === 0 &&
                              calculatedgoals.monthlyClients === 0 &&
                              calculatedgoals.yearlyClients === 0 &&
                              calculatedgoals.hoursPerDay === 0 ? (
                                <BsQuestionLg />
                              ) : calculatedgoals.monthlyClients === 0 ? (
                                0
                              ) : calculatedgoals.monthlyClients > 0 ? (
                                calculatedgoals.monthlyClients
                              ) : null}
                            </span>
                            <span className="cl-name">Clients Monthly</span>
                          </li>
                          <li>
                            <span className="icon">
                              {calculatedgoals &&
                              calculatedgoals.weeklyClients === 0 &&
                              calculatedgoals.monthlyClients === 0 &&
                              calculatedgoals.yearlyClients === 0 &&
                              calculatedgoals.hoursPerDay === 0 ? (
                                <BsQuestionLg />
                              ) : calculatedgoals.yearlyClients === 0 ? (
                                0
                              ) : calculatedgoals.yearlyClients > 0 ? (
                                calculatedgoals.yearlyClients
                              ) : null}
                            </span>
                            <span className="cl-name">Clients Annualy</span>
                          </li>
                        </ul>
                      </div>
                      <Button onClick={handleNumber}>
                        Commit to These Goals!
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Goals;
