import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Table, Col } from "react-bootstrap";
import IncomeForm from "../../components/BadgetForm/IncomeForm";
const Summary = (props) => {
  console.log(props, "props in summmary");
  const CalculateSummary = ({
    // income,
    discretionary,
    houseHold,
    housing,
    loanPayments,
    personalInsurance,
    companyExpenses,
    transportation,
    handleSubmit,
    sumObj,
  }) => {
    const [summaryObject, setSummaryObject] = useState({});

    useEffect(() => {
      // let totalMonthlyIncome = 0;
      // let totalAnnualIncome = 0;
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
      //       totalMonthlyIncome = totalMonthlyIncome.toFixed(0)
      // }
      // if (totalMonthlyIncome) {
      //   totalAnnualIncome = totalMonthlyIncome * 12;
      //       totalAnnualIncome = totalAnnualIncome.toFixed(0)
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
      // netMonthlyRemainings = totalMonthlyIncome - netMonthlyExpense;
      // netAnnualRemainings = netMonthlyRemainings * 12;
      setSummaryObject({
        // totalMonthlyIncome,
        // totalAnnualIncome,
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
      });
    }, []);

    // useEffect(() => {
    //   sumObj({ ...summaryObject });
    // }, [summaryObject]);
    console.log(summaryObject, "summary");
    return (
      <>
        <div className="dashboard-wrapper">
          <Container>
            <div className="bugdet-form-summary">
              <div className="summary-list">
                {/* <div className="summary-heading">
                  <h1>Income</h1>
                  <Button
                    onClick={() => {
                      props.setActiveStep(0);
                    }}
                  >
                    Edit
                  </Button>
                </div>
                <div className="summary-listbar">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          Salary(Personal from beauty/wellness services you
                          provide)
                        </td>
                        <td>
                          $
                          {props.income.personalSalary
                            ? props.income.personalSalary
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Bonus(Personal):</td>
                        <td>
                          $
                          {props.income.personalBonus
                            ? props.income.personalBonus
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Other Income(Personal): </td>
                        <td>
                          $
                          {props.income.personalOtherIncome
                            ? props.income.personalOtherIncome
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Salary(Spouse/Partner): </td>
                        <td>
                          $
                          {props.income.spouseSalary
                            ? props.income.spouseSalary
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Bonus(Spouse/Partner): </td>
                        <td>
                          $
                          {props.income.SpouseBonus
                            ? props.income.SpouseBonus
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Other Income(Spouse/Partner): </td>
                        <td>
                          $
                          {props.income.spouseOtherIncome
                            ? props.income.spouseOtherIncome
                            : 0}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Total Monthly Income </td>
                        <td>
                          $
                          {summaryObject && summaryObject.totalMonthlyIncome
                            ? summaryObject.totalMonthlyIncome
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Yearly Income</td>
                        <td>
                          $
                          {summaryObject && summaryObject.totalAnnualIncome
                            ? summaryObject.totalAnnualIncome
                            : 0}
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </div> */}
              </div>

              <div className="summary-list">
                <div className="summary-heading">
                  <h1>Housing</h1>
                  <Button
                    onClick={() => {
                      props.setActiveStep(0);
                    }}
                  >
                    Edit
                  </Button>
                </div>
                <div className="summary-listbar">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Mortgage/Rent:</td>
                        <td>
                          ${props.housing.mortgage ? props.housing.mortgage : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Property Tax:</td>
                        <td>
                          $
                          {props.housing.propertyTax
                            ? props.housing.propertyTax
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Home Maintenance: </td>
                        <td>
                          $
                          {props.housing.homeMaintenance
                            ? props.housing.homeMaintenance
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Homeower's Insurance:</td>
                        <td>
                          $
                          {props.housing.homeowerInsurance
                            ? props.housing.homeowerInsurance
                            : 0}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="summary-heading">
                  <h1>Utilites</h1>
                </div>
                <div className="summary-listbar">
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Electric:</td>
                        <td>
                          ${props.housing.electric ? props.housing.electric : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Gas:</td>
                        <td>${props.housing.gas ? props.housing.gas : 0}</td>
                      </tr>
                      <tr>
                        <td>Water: </td>
                        <td>
                          ${props.housing.water ? props.housing.water : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Cable:</td>
                        <td>
                          ${props.housing.cable ? props.housing.cable : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Telephone:</td>
                        <td>
                          $
                          {props.housing.talephone
                            ? props.housing.talephone
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Others:</td>
                        <td>
                          ${props.housing.other ? props.housing.other : 0}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Total Monthly expense </td>
                        <td>
                          $
                          {summaryObject && summaryObject.totalMonthlyHousing
                            ? summaryObject.totalMonthlyHousing
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Yearly expense</td>
                        <td>
                          $
                          {summaryObject && summaryObject.totalAnnualHousing
                            ? summaryObject.totalAnnualHousing
                            : 0}
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
              </div>

              <div className="summary-list">
                <div className="summary-heading">
                  <h1>Transportation</h1>
                  <Button
                    onClick={() => {
                      props.setActiveStep(1);
                    }}
                  >
                    Edit
                  </Button>
                </div>
                <div className="summary-listbar">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Auto Payment(s)</td>
                        <td>
                          $
                          {props.transportation.autoPayment
                            ? props.transportation.autoPayment
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Auto Insurance:</td>
                        <td>
                          $
                          {props.transportation.autoInsurance
                            ? props.transportation.autoInsurance
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Gas: </td>
                        <td>
                          $
                          {props.transportation.tranpotationGas
                            ? props.transportation.tranpotationGas
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Maintenance: </td>
                        <td>
                          $
                          {props.transportation.maintenance
                            ? props.transportation.maintenance
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>License/Registration: </td>
                        <td>
                          $
                          {props.transportation.LicenseRegistration
                            ? props.transportation.LicenseRegistration
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Parking/Toll/Bus/Train: </td>
                        <td>
                          $
                          {props.transportation.ParkingTollBusTrain
                            ? props.transportation.ParkingTollBusTrain
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Others: </td>
                        <td>
                          $
                          {props.transportation.Others
                            ? props.transportation.Others
                            : 0}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Total Monthly expense </td>
                        <td>
                          $
                          {summaryObject &&
                          summaryObject.totalMonthlyTransportation
                            ? summaryObject.totalMonthlyTransportation
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Yearly expense</td>
                        <td>
                          $
                          {summaryObject &&
                          summaryObject.totalAnnualTransportation
                            ? summaryObject.totalAnnualTransportation
                            : 0}
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
              </div>

              <div className="summary-list">
                <div className="summary-heading">
                  <h1>Household</h1>
                  <Button
                    onClick={() => {
                      props.setActiveStep(2);
                    }}
                  >
                    Edit
                  </Button>
                </div>
                <div className="summary-listbar">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Groceries</td>
                        <td>
                          $
                          {props.houseHold.groceries
                            ? props.houseHold.groceries
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Personal care:</td>
                        <td>
                          $
                          {props.houseHold.personalCare
                            ? props.houseHold.personalCare
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Clothing/Dry cleaning: </td>
                        <td>
                          $
                          {props.houseHold.ClothingDryCleaning
                            ? props.houseHold.ClothingDryCleaning
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Domestic Help: </td>
                        <td>
                          $
                          {props.houseHold.domesticHelp
                            ? props.houseHold.domesticHelp
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Professional Dues: </td>
                        <td>
                          $
                          {props.houseHold.professionaldues
                            ? props.houseHold.professionaldues
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Dependent/Child care: </td>
                        <td>
                          $
                          {props.houseHold.dependentChildCare
                            ? props.houseHold.dependentChildCare
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Education/School: </td>
                        <td>
                          $
                          {props.houseHold.educationSchool
                            ? props.houseHold.educationSchool
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Cash Allowances: </td>
                        <td>
                          $
                          {props.houseHold.cashAllowances
                            ? props.houseHold.cashAllowances
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Others: </td>
                        <td>
                          ${props.houseHold.others ? props.houseHold.others : 0}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Total Monthly expense </td>
                        <td>
                          $
                          {summaryObject && summaryObject.totalMonthlyHouseHold
                            ? summaryObject.totalMonthlyHouseHold
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Yearly expense</td>
                        <td>
                          $
                          {summaryObject && summaryObject.totalAnnualHouseHold
                            ? summaryObject.totalAnnualHouseHold
                            : 0}
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
              </div>

              <div className="summary-list">
                <div className="summary-heading">
                  <h1>Loan Payments</h1>
                  <Button
                    onClick={() => {
                      props.setActiveStep(3);
                    }}
                  >
                    Edit
                  </Button>
                </div>
                <div className="summary-listbar">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Credit card Payment</td>
                        <td>
                          $
                          {props.loanPayments.creditCardPayment
                            ? props.loanPayments.creditCardPayment
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Other Loan Payment::</td>
                        <td>
                          $
                          {props.loanPayments.otherLoanPayment
                            ? props.loanPayments.otherLoanPayment
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Saving/Investing: </td>
                        <td>
                          $
                          {props.loanPayments.savingInvesting
                            ? props.loanPayments.savingInvesting
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Others: </td>
                        <td>
                          $
                          {props.loanPayments.others
                            ? props.loanPayments.others
                            : 0}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Total Monthly expense: </td>
                        <td>
                          $
                          {summaryObject &&
                          summaryObject.totalMonthlyLoanPayments
                            ? summaryObject.totalMonthlyLoanPayments
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Monthly expense:</td>
                        <td>
                          $
                          {summaryObject &&
                          summaryObject.totalAnnualLoanPayments
                            ? summaryObject.totalAnnualLoanPayments
                            : 0}
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
              </div>

              <div className="summary-list">
                <div className="summary-heading">
                  <h1>Personal Insurance</h1>
                  <Button
                    onClick={() => {
                      props.setActiveStep(4);
                    }}
                  >
                    Edit
                  </Button>
                </div>
                <div className="summary-listbar">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Health Insurance: </td>
                        <td>
                          $
                          {props.personalInsurance.healthInsurance
                            ? props.personalInsurance.healthInsurance
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Life Insurance:</td>
                        <td>
                          $
                          {props.personalInsurance.lifeInsurance
                            ? props.personalInsurance.lifeInsurance
                            : 0}
                        </td>
                      </tr>
                      Expense                      <tr>
                        <td>Disability Income Insurance: </td>
                        <td>
                          $
                          {props.personalInsurance.disabilityIncomeInsurance
                            ? props.personalInsurance.disabilityIncomeInsurance
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Long term Health care Insurance: </td>
                        <td>
                          $
                          {props.personalInsurance.healthCareInsurance
                            ? props.personalInsurance.healthCareInsurance
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Medical/Dental/Vision/Drug: </td>
                        <td>
                          $
                          {props.personalInsurance.medicalDentalVisionDrug
                            ? props.personalInsurance.medicalDentalVisionDrug
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Others:</td>
                        <td>
                          $
                          {props.personalInsurance.others
                            ? props.personalInsurance.others
                            : 0}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Total Monthly expense </td>
                        <td>
                          $
                          {summaryObject &&
                          summaryObject.totalMonthlyPersonalInsurance
                            ? summaryObject.totalMonthlyPersonalInsurance
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Yearly expense</td>
                        <td>
                          $
                          {summaryObject &&
                          summaryObject.totalAnnualPersonalInsurance
                            ? summaryObject.totalAnnualPersonalInsurance
                            : 0}
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
              </div>

              <div className="summary-list">
                <div className="summary-heading">
                  <h1>Discretionary</h1>
                  <Button
                    onClick={() => {
                      props.setActiveStep(5);
                    }}
                  >
                    Edit
                  </Button>
                </div>
                <div className="summary-listbar">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dining Out:</td>
                        <td>
                          $
                          {props.discretionary.diningOut
                            ? props.discretionary.diningOut
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Recreation/Club Dues:</td>
                        <td>
                          $
                          {props.discretionary.recreationClubDues
                            ? props.discretionary.recreationClubDues
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Movies/Sporting Events: </td>
                        <td>
                          $
                          {props.discretionary.moviesSportingEvents
                            ? props.discretionary.moviesSportingEvents
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Hobbies:</td>
                        <td>
                          $
                          {props.discretionary.hobbies
                            ? props.discretionary.hobbies
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Vacation/Travel:</td>
                        <td>
                          $
                          {props.discretionary.vacationTravel
                            ? props.discretionary.vacationTravel
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Child Care:</td>
                        <td>
                          $
                          {props.discretionary.childCare
                            ? props.discretionary.childCare
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Gift/Contributions:</td>
                        <td>
                          $
                          {props.discretionary.giftContributions
                            ? props.discretionary.giftContributions
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Others:</td>
                        <td>
                          $
                          {props.discretionary.others
                            ? props.discretionary.others
                            : 0}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Total Monthly expense </td>
                        <td>
                          $
                          {summaryObject &&
                          summaryObject.totalMonthlyDiscretionary
                            ? summaryObject.totalMonthlyDiscretionary
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Yearly expense</td>
                        <td>
                          $
                          {summaryObject &&
                          summaryObject.totalAnnualDiscretionary
                            ? summaryObject.totalAnnualDiscretionary
                            : 0}
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
              </div>
              <div className="summary-list">
                <div className="summary-heading">
                  <h1>Company Expenses</h1>
                  <Button
                    onClick={() => {
                      props.setActiveStep(6);
                    }}
                  >
                    Edit
                  </Button>
                </div>
                <div className="summary-listbar">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Rent:</td>
                        <td>
                          $
                          {props.companyExpenses.rent
                            ? props.companyExpenses.rent
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Gas:</td>
                        <td>
                          $
                          {props.companyExpenses.companyGas
                            ? props.companyExpenses.companyGas
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Water: </td>
                        <td>
                          $
                          {props.companyExpenses.companyWater
                            ? props.companyExpenses.companyWater
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Electricity:</td>
                        <td>
                          $
                          {props.companyExpenses.electricity
                            ? props.companyExpenses.electricity
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Cellular:</td>
                        <td>
                          $
                          {props.companyExpenses.cellular
                            ? props.companyExpenses.cellular
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Internet:</td>
                        <td>
                          $
                          {props.companyExpenses.internet
                            ? props.companyExpenses.internet
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Marketing:</td>
                        <td>
                          $
                          {props.companyExpenses.marketing
                            ? props.companyExpenses.marketing
                            : 0}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Total Monthly Company Expense </td>
                        <td>
                          $
                          {summaryObject &&
                          summaryObject.totalMonthlyCompanyExpenses
                            ? summaryObject.totalMonthlyCompanyExpenses
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Yearly Company Expense</td>
                        <td>
                          $
                          {summaryObject &&
                          summaryObject.totalAnnualCompanyExpenses
                            ? summaryObject.totalAnnualCompanyExpenses
                            : 0}
                        </td>
                      </tr>
                    </tfoot>
                  </Table>

                  <Table className="Total-incomebox">
                    <tfoot>
                      <tr>
                        {/* <td>Total Monthly Income:</td>
                        <td>
                          {" "}
                          $
                          {summaryObject && summaryObject.totalMonthlyIncome
                            ? summaryObject.totalMonthlyIncome
                            : 0}
                        </td> */}
                      </tr>
                      <tr>
                        {/* <td>Total Yearly Income:</td>
                        <td>
                          {" "}
                          $
                          {summaryObject && summaryObject.totalAnnualIncome
                            ? summaryObject.totalAnnualIncome
                            : 0}
                        </td> */}
                      </tr>

                      <tr>
                        <td>Total Monthly Personal Expense:</td>
                        <td>
                          {" "}
                          $
                          {summaryObject && summaryObject.netMonthlyExpense
                            ? summaryObject.netMonthlyExpense
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Yearly Personal Expense:</td>
                        <td>
                          {" "}
                          $
                          {summaryObject && summaryObject.netAnnualExpense
                            ? summaryObject.netAnnualExpense
                            : 0}
                        </td>
                      </tr>

                      <tr>
                        <td>Total Monthly Company Expense:</td>
                        <td>
                          $
                          {summaryObject &&
                          summaryObject.totalMonthlyCompanyExpenses
                            ? summaryObject.totalMonthlyCompanyExpenses
                            : 0}
                        </td>
                      </tr>
                      <tr>
                           <td>Total Yearly Company Expense:</td>
                           <td>
                          $
                          {summaryObject &&
                          summaryObject.totalAnnualCompanyExpenses
                            ? summaryObject.totalAnnualCompanyExpenses
                            : 0}
                        </td>
                      </tr>
                      <tr>
                        {/* <td>Total Monthly Remainings:</td>
                        <td>
                          {" "}
                          $
                          {summaryObject && summaryObject.netMonthlyRemainings
                            ? summaryObject.netMonthlyRemainings
                            : null}
                        </td> */}
                      </tr>
                      <tr>
                        {/* <td>Total Yearly Company Remainings:</td>
                        <td>
                          {" "}
                          $
                          {summaryObject && summaryObject.netAnnualRemainings
                            ? summaryObject.netAnnualRemainings
                            : null}
                        </td> */}
                      </tr>
                    </tfoot>
                  </Table>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  };

  return <CalculateSummary {...props} />;
};

export default Summary;
