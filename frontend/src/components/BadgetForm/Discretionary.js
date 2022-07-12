import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";
const Discretionary = (props) => {
  return (
    <>
      <div className="dashboard-wrapper">
        <Container>
          <div className="bugdet-form">
            <h2 className="title">Discretionary</h2>
            <div className="form-wrapper">
              <Form>
                <Row>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Dining Out:</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="diningOut"
                        value={props.discretionary.diningOut}
                        onChange={(e) => props.handleDiscretionary(e)}
                        placeholder="10"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Recreation/Club Dues:</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="recreationClubDues"
                        value={props.discretionary.recreationClubDues}
                        onChange={(e) => props.handleDiscretionary(e)}
                        placeholder="10"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Movies/Sporting Events:</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="moviesSportingEvents"
                        value={props.discretionary.moviesSportingEvents}
                        onChange={(e) => props.handleDiscretionary(e)}
                        placeholder="10"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Hobbies:</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="hobbies"
                        value={props.discretionary.hobbies}
                        onChange={(e) => props.handleDiscretionary(e)}
                        placeholder="10"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Vacation/Travel:</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="vacationTravel"
                        value={props.discretionary.vacationTravel}
                        onChange={(e) => props.handleDiscretionary(e)}
                        placeholder="10"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Child Care:</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="childCare"
                        value={props.discretionary.childCare}
                        onChange={(e) => props.handleDiscretionary(e)}
                        placeholder="10"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gift/Contributions:</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="giftContributions"
                        value={props.discretionary.giftContributions}
                        onChange={(e) => props.handleDiscretionary(e)}
                        placeholder="10"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Others:</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="others"
                        value={props.discretionary.others}
                        onChange={(e) => props.handleDiscretionary(e)}
                        placeholder="10"
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

export default Discretionary;
