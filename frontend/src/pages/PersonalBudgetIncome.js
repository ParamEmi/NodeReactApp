import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  StepLabel,
  Step,
  Stepper,
  StepContent,
} from "@material-ui/core";
import { Container } from "react-bootstrap";
import Housing from "../components/BadgetForm/Housing";
import IncomeForm from "../components/BadgetForm/IncomeForm";
import Transportation from "../components/BadgetForm/Transportation";
import Household from "../components/BadgetForm/Household";
import Discretionary from "../components/BadgetForm/Discretionary";
import Loanpayment from "../components/BadgetForm/Loanpayment";
import PersonalInsurance from "../components/BadgetForm/PersonalInsurance";
import CompanyExpenses from "../components/BadgetForm/CompanyExpenses";
import Summary from "../components/BadgetForm/Summary";
import HeaderTop from "../components/HeaderTop";
import { useDispatch, useSelector } from "react-redux";
import {
  savePersonalBudgetAction,
  getPersonalBudgetAction,
} from "../services/commonService";

const HorizontalLinearStepper = (props) => {
  const navigate = useNavigate();
  const [incomeEdit, setIncomeEdit] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [personalBudgetForm, setPersonalBudgetForm] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [summaryObject, setSummaryObject] = useState({});
  const tokenResponse = useSelector((state) => state.auth.token);

  const getPersonalBudget = async () => {
    const response = await getPersonalBudgetAction(tokenResponse);
    console.log(response, "getPersonalBudget");
    if (response && response.personalBudget) {
      let personalBudget = response.personalBudget;
      // if (personalBudget.income) {
      //   setIncome(personalBudget.income);
      // }
      if (personalBudget.discretionary) {
        setDiscretionary(personalBudget.discretionary);
      }
      if (personalBudget.houseHold) {
        sethouseHold(personalBudget.houseHold);
      }
      if (personalBudget.housing) {
        setHousing(personalBudget.housing);
      }
      if (personalBudget.loanPayments) {
        setLoanPayments(personalBudget.loanPayments);
      }
      if (personalBudget.personalInsurance) {
        setPersonalInsurance(personalBudget.personalInsurance);
      }
      if (personalBudget.transportation) {
        setTransportation(personalBudget.transportation);
      }
      if (personalBudget.companyExpenses) {
        setCompanyExpenses(personalBudget.companyExpenses);
      }
    }
  };

  useEffect(() => {
    if (searchParams.get("summery") !== null) {
      setActiveStep(8);
    }
    getPersonalBudget();
  }, [tokenResponse]);

  const loginStatus = () => {
    navigate("/dashboard");
  };

  // let [income, setIncome] = React.useState({
  //   personalSalary: "0",
  //   personalBonus: "0",
  //   personalOtherIncome: "0",
  //   spouseSalary: "0",
  //   SpouseBonus: "0",
  //   spouseOtherIncome: "0",
  // });

  let [housing, setHousing] = React.useState({
    mortgage: "0",
    propertyTax: "0",
    homeMaintenance: "0",
    homeowerInsurance: "0",
    electric: "0",
    gas: "0",
    water: "0",
    cable: "0",
    talephone: "0",
    other: "0",
  });

  let [transportation, setTransportation] = React.useState({
    autoPayment: "0",
    autoInsurance: "0",
    transportationGas: "0",
    maintenance: "0",
    LicenseRegistration: "0",
    ParkingTollBusTrain: "0",
    Others: "0",
  });

  let [houseHold, sethouseHold] = React.useState({
    groceries: "0",
    personalCare: "0",
    ClothingDryCleaning: "0",
    domesticHelp: "0",
    professionaldues: "0",
    dependentChildCare: "0",
    educationSchool: "0",
    cashAllowances: "0",
    others: "0",
  });
  let [loanPayments, setLoanPayments] = React.useState({
    creditCardPayment: "0",
    otherLoanPayment: "0",
    savingInvesting: "0",
    others: "0",
  });

  let [personalInsurance, setPersonalInsurance] = React.useState({
    healthInsurance: "0",
    lifeInsurance: "0",
    disabilityIncomeInsurance: "0",
    healthCareInsurance: "0",
    medicalDentalVisionDrug: "0",
    others: "0",
  });

  let [discretionary, setDiscretionary] = React.useState({
    diningOut: "0",
    recreationClubDues: "0",
    moviesSportingEvents: "0",
    hobbies: "0",
    vacationTravel: "0",
    childCare: "0",
    giftContributions: "0",
    others: "0",
  });
  let [companyExpenses, setCompanyExpenses] = React.useState({
    rent: "0",
    companyGas: "0",
    companyWater: "0",
    electricity: "0",
    cellular: "0",
    internet: "0",
    marketing: "0",
  });

  // const handleIncomechange = (e) => {
  //   const { name, value } = e.target;
  //   const data = e.target.validity.valid ? value : undefined;
  //   if (data !== undefined) {
  //     setIncome({
  //       ...income,
  //       [name]: data,
  //     });
  //   }
  // };

  const handleHousingchange = (e) => {
    const { name, value } = e.target;
    const data = e.target.validity.valid ? value : undefined;
    if (data !== undefined) {
      setHousing({
        ...housing,
        [name]: value,
      });
    }
  };

  const handleTransportationChange = (e) => {
    const { name, value } = e.target;
    const data = e.target.validity.valid ? value : undefined;
    if (data !== undefined) {
      setTransportation({
        ...transportation,
        [name]: value,
      });
    }
  };

  const handleHouseHoldonChange = (e) => {
    const { name, value } = e.target;
    const data = e.target.validity.valid ? value : undefined;
    if (data !== undefined) {
      sethouseHold({
        ...houseHold,
        [name]: value,
      });
    }
  };

  const handleLoanPaymentsonChange = (e) => {
    const { name, value } = e.target;
    const data = e.target.validity.valid ? value : undefined;
    if (data !== undefined) {
      setLoanPayments({
        ...loanPayments,
        [name]: value,
      });
    }
  };

  const handlePersonalInsuranceonChange = (e) => {
    const { name, value } = e.target;

    const data = e.target.validity.valid ? value : undefined;
    if (data !== undefined) {
      setPersonalInsurance({
        ...personalInsurance,
        [name]: value,
      });
    }
  };
  const handleDiscretionaryonChange = (e) => {
    const { name, value } = e.target;
    const data = e.target.validity.valid ? value : undefined;
    if (data !== undefined) {
      setDiscretionary({
        ...discretionary,
        [name]: value,
      });
    }
  };
  const handleCompanyExpensesonChange = (e) => {
    const { name, value } = e.target;
    const data = e.target.validity.valid ? value : undefined;
    if (data !== undefined) {
      setCompanyExpenses({
        ...companyExpenses,
        [name]: value,
      });
    }
  };

  const savePersonalBudget = async (data) => {
    const response = await savePersonalBudgetAction(data, tokenResponse);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  console.log(discretionary, "discretionary");
  const handleNext = () => {
    let dataObj = {
      // income: income,
      housing: housing,
      transportation: transportation,
      houseHold: houseHold,
      loanPayments: loanPayments,
      personalInsurance: personalInsurance,
      discretionary: discretionary,
      companyExpenses: companyExpenses,
    };
    if (activeStep === 8) {
      let totalMonthlyIncome = 0;
      let totalAnnualIncome = 0;
      let totalMonthlyDiscretionary = 0;
      let totalAnnualDiscretionary = 0;
      let totalMonthlyCompanyExpenses = 0;
      let totalAnnualCompanyExpenses = 0;
      let totalMonthlyHouseHold = 0;
      let totalAnnualHouseHold = 0;
      let totalMonthlyHousing = 0;
      let totalAnnualHousing = 0;
      let totalMonthlyLoanPayments = 0;
      let totalAnnualLoanPayments = 0;
      let totalMonthlyPersonalInsurance = 0;
      let totalAnnualPersonalInsurance = 0;
      let totalMonthlyTransportation = 0;
      let totalAnnualTransportation = 0;
      let netMonthlyExpense = 0;
      let netAnnualExpense = 0;
      let netMonthlyRemainings = 0;
      let netAnnualRemainings = 0;

      //income
      // for (const [key, value] of Object.entries(income)) {
      //   totalMonthlyIncome =
      //     Number(totalMonthlyIncome ? totalMonthlyIncome : 0) +
      //     Number(value ? value : 0);
      //   //       totalMonthlyIncome = totalMonthlyIncome.toFixed(0)
      // }
      // if (totalMonthlyIncome) {
      //   totalAnnualIncome = totalMonthlyIncome * 12;
      //   //       totalAnnualIncome = totalAnnualIncome.toFixed(0)
      // }
      //discretionary
      for (const [key, value] of Object.entries(discretionary)) {
        totalMonthlyDiscretionary =
          Number(totalMonthlyDiscretionary ? totalMonthlyDiscretionary : 0) +
          Number(value ? value : 0);
        //    totalMonthlyDiscretionary = totalMonthlyDiscretionary.toFixed(0)
      }
      if (totalMonthlyDiscretionary) {
        totalAnnualDiscretionary = totalMonthlyDiscretionary * 12;
        //   totalAnnualDiscretionary = totalAnnualDiscretionary.toFixed(0)
      }
      //companyExpenses
      for (const [key, value] of Object.entries(companyExpenses)) {
        totalMonthlyCompanyExpenses =
          Number(
            totalMonthlyCompanyExpenses ? totalMonthlyCompanyExpenses : 0
          ) + Number(value ? value : 0);
        //    totalMonthlyCompanyExpenses = totalMonthlyCompanyExpenses.toFixed(0)
      }
      if (totalMonthlyCompanyExpenses) {
        totalAnnualCompanyExpenses = totalMonthlyCompanyExpenses * 12;
        //   totalAnnualCompanyExpenses = totalAnnualCompanyExpenses.toFixed(0)
      }
      //houseHold
      for (const [key, value] of Object.entries(houseHold)) {
        totalMonthlyHouseHold =
          Number(totalMonthlyHouseHold ? totalMonthlyHouseHold : 0) +
          Number(value ? value : 0);
        //   totalMonthlyHouseHold = totalMonthlyHouseHold.toFixed(0)
      }
      if (totalMonthlyHouseHold) {
        totalAnnualHouseHold = totalMonthlyHouseHold * 12;
        //  totalAnnualHouseHold = totalAnnualHouseHold.toFixed(0)
      }
      //housing
      for (const [key, value] of Object.entries(housing)) {
        totalMonthlyHousing =
          Number(totalMonthlyHousing ? totalMonthlyHousing : 0) +
          Number(value ? value : 0);
        //   totalMonthlyHousing = totalMonthlyHousing.toFixed(0)
      }
      if (totalMonthlyHousing) {
        totalAnnualHousing = totalMonthlyHousing * 12;
        //   totalAnnualHousing = totalAnnualHousing.toFixed(0)
      }
      //loanPayments
      for (const [key, value] of Object.entries(loanPayments)) {
        totalMonthlyLoanPayments =
          Number(totalMonthlyLoanPayments ? totalMonthlyLoanPayments : 0) +
          Number(value ? value : 0);
        //   totalMonthlyLoanPayments = totalMonthlyLoanPayments.toFixed(0)
      }
      if (totalMonthlyLoanPayments) {
        totalAnnualLoanPayments = totalMonthlyLoanPayments * 12;
        //  totalAnnualLoanPayments = totalAnnualLoanPayments.toFixed(0)
      }
      //personalInsurance
      for (const [key, value] of Object.entries(personalInsurance)) {
        totalMonthlyPersonalInsurance =
          Number(
            totalMonthlyPersonalInsurance ? totalMonthlyPersonalInsurance : 0
          ) + Number(value ? value : 0);
        //  totalMonthlyPersonalInsurance = totalMonthlyPersonalInsurance.toFixed(0)
      }
      if (totalMonthlyPersonalInsurance) {
        totalAnnualPersonalInsurance = totalMonthlyPersonalInsurance * 12;
        //  totalAnnualPersonalInsurance = totalAnnualPersonalInsurance.toFixed(0)
      }
      //transportation
      for (const [key, value] of Object.entries(transportation)) {
        totalMonthlyTransportation =
          Number(totalMonthlyTransportation ? totalMonthlyTransportation : 0) +
          Number(value ? value : 0);
        // totalMonthlyTransportation = totalMonthlyTransportation.toFixed(0)
      }
      if (totalMonthlyTransportation) {
        totalAnnualTransportation = totalMonthlyTransportation * 12;
        // totalAnnualTransportation = totalAnnualTransportation.toFixed(0)
      }
      netMonthlyExpense =
      // totalMonthlyCompanyExpenses +
        totalMonthlyDiscretionary +
        totalMonthlyHouseHold +
        totalMonthlyHousing +
        totalMonthlyLoanPayments +
        totalMonthlyPersonalInsurance +
        totalMonthlyTransportation;
      netAnnualExpense = netMonthlyExpense * 12;
      netMonthlyRemainings = totalMonthlyIncome - netMonthlyExpense;
      netAnnualRemainings = netMonthlyRemainings * 12;
      let sumObj = {
        totalMonthlyIncome,
        totalAnnualIncome,
        totalMonthlyDiscretionary,
        totalAnnualDiscretionary,
        totalMonthlyCompanyExpenses,
        totalAnnualCompanyExpenses,
        totalMonthlyHouseHold,
        totalAnnualHouseHold,
        totalMonthlyHousing,
        totalAnnualHousing,
        totalMonthlyLoanPayments,
        totalAnnualLoanPayments,
        totalMonthlyPersonalInsurance,
        totalAnnualPersonalInsurance,
        totalMonthlyTransportation,
        totalAnnualTransportation,
        netMonthlyExpense,
        netAnnualExpense,
        netMonthlyRemainings,
        netAnnualRemainings,
      };
      dataObj.summaryObject = sumObj;
    }

    savePersonalBudget(dataObj);
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    // nevigate("/Goals");
  };

  const handleNextGoals = () => {
    navigate("/Goals");
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const editclick = () => {
    // <IncomeForm income={income} />;
    // setIncomeEdit((incomeedit) => [...incomeedit, <IncomeForm />]);
    setIncomeEdit(true);
  };

  const steps = [
    // {
    //   label: "Income",
    //   description: <IncomeForm income={income} handle={handleIncomechange} />,
    // },
    {
      label: "Housing",
      description: (
        <Housing housing={housing} handleHosuing={handleHousingchange} />
      ),
    },
    {
      label: "Transportation",
      description: (
        <Transportation
          transportation={transportation}
          handletransPort={handleTransportationChange}
        />
      ),
    },
    {
      label: "Household",
      description: (
        <Household
          houseHold={houseHold}
          handleHouseHold={handleHouseHoldonChange}
        />
      ),
    },
    {
      label: "Loan Payments",
      description: (
        <Loanpayment
          loanPayments={loanPayments}
          handleLoanPayment={handleLoanPaymentsonChange}
        />
      ),
    },
    {
      label: "Personal Insurance",
      description: (
        <PersonalInsurance
          personalInsurance={personalInsurance}
          handlePersonalInsurence={handlePersonalInsuranceonChange}
        />
      ),
    },
    {
      label: "Discretionary",
      description: (
        <Discretionary
          discretionary={discretionary}
          handleDiscretionary={handleDiscretionaryonChange}
        />
      ),
    },
    {
      label: "Company Expenses",
      description: (
        <CompanyExpenses
          companyExpenses={companyExpenses}
          handleCompanyExpenses={handleCompanyExpensesonChange}
        />
      ),
    },
    {
      label: "Summary",
      description: (
        <Summary
          // income={income}
          housing={housing}
          houseHold={houseHold}
          transportation={transportation}
          loanPayments={loanPayments}
          personalInsurance={personalInsurance}
          discretionary={discretionary}
          companyExpenses={companyExpenses}
          setActiveStep={setActiveStep}
        />
      ),
    },
  ];
  console.log(summaryObject, "summaryObject");
  return (
    <div className="budget-form-wrapper">
      <HeaderTop />
      <Container>
        <div className="budget-form-box">
          <Stepper
            activeStep={activeStep}
            // onClick={(index) => handleclick(index)}
          >
            {steps.map((step, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }

              return (
                <Step key={step.label}>
                  <StepLabel
                    onClick={() => {
                      setActiveStep(index);
                    }}
                    className="steplabel"
                    {...labelProps}
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Stepper className="steper-form" activeStep={activeStep}>
            {steps.map((step, index) => {
              return (
                <StepContent transitionDuration="auto">
                  {step.description}
                </StepContent>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            loginStatus()
          ) : (
            //  navigate("/dashboard")
            // <div className="stepbtn">
            //   <span>All steps completed - you&apos;re finished</span>
            //   <Button className="resetbtn" onClick={handleReset}>
            //     Reset
            //   </Button>
            // </div>

            <>
              <div className="stepbtn">
                <Button
                  className="bkbtn"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <div className="submitbtn">
                  <Button className="nextbtn" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>

                  {activeStep === steps.length - 1 && (
                    <Link to="/Goals" style={{ textDecoration: "none" }}>
                      <Button className="nextbtn" onClick={handleNext}>
                        Submit and go to My-Goals
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default HorizontalLinearStepper;
