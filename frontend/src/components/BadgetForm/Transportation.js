import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";
const Transportation = (props) => {
  console.log(props, "props in transportation");
  return (
    <>
      <div className="dashboard-wrapper">
        <Container>
          <div className="bugdet-form">
            <h2 className="title">Transportation</h2>
            <div className="form-wrapper">
              <Form>
                <Row>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Auto Payment(s):</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="autoPayment"
                        value={props.transportation.autoPayment}
                        onChange={(e) => props.handletransPort(e)}
                        // placeholder="10"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Auto Insurance:</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="autoInsurance"
                        value={props.transportation.autoInsurance}
                        onChange={(e) => props.handletransPort(e)}
                        placeholder="10"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gas:</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="transportationGas"
                        value={props.transportation.transportationGas}
                        onChange={(e) => props.handletransPort(e)}
                        placeholder="10"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Maintenance:</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="maintenance"
                        value={props.transportation.maintenance}
                        onChange={(e) => props.handletransPort(e)}
                        placeholder="10"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>License/Registration:</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="LicenseRegistration"
                        value={props.transportation.LicenseRegistration}
                        onChange={(e) => props.handletransPort(e)}
                        placeholder="10"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Parking/Toll/Bus/Train:</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]*"
                        name="ParkingTollBusTrain"
                        value={props.transportation.ParkingTollBusTrain}
                        onChange={(e) => props.handletransPort(e)}
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
                        name="Others"
                        value={props.transportation.Others}
                        onChange={(e) => props.handletransPort(e)}
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

export default Transportation;
