import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";
import { BsQuestionLg } from "react-icons/bs";
const IncomeForm = (props) => {
  // console.log(props, "props in income");
  return (
    <>
      <div className="dashboard-wrapper">
        <Container>
          <div className="bugdet-form">
            <h2 className="title">Income</h2>
            <div className="form-wrapper">
              <Form>
                <Row>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Salary(Personal from beauty/wellness services you
                        provide):
                      </Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="personalSalary"
                        value={props.income.personalSalary}
                        onChange={(e) => props.handle(e)}
                        // placeholder="5000"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Bonus(Personal):</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="personalBonus"
                        value={props.income.personalBonus}
                        onChange={(e) => props.handle(e)}
                        // placeholder="100"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Other Income(Personal):</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="personalOtherIncome"
                        value={props.income.personalOtherIncome}
                        onChange={(e) => props.handle(e)}
                        // placeholder="100"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Salary(Spouse/Partner):</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="spouseSalary"
                        value={props.income.spouseSalary}
                        onChange={(e) => props.handle(e)}
                        // placeholder="100"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Bonus(Spouse/Partner):</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="SpouseBonus"
                        value={props.income.SpouseBonus}
                        onChange={(e) => props.handle(e)}
                        // placeholder="100"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Other Income(Spouse/Partner):</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="spouseOtherIncome"
                        value={props.income.spouseOtherIncome}
                        onChange={(e) => props.handle(e)}
                        // placeholder="100"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default IncomeForm;
