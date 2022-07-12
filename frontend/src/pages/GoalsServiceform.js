import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessByUserAction } from "../services/userGoalServices";

const GoalsServiceform = ({
  index,
  service,
  handleService,
  serviceName,
  error1,
  tokenResponse,
}) => {
  const [bussAct, setBussAct] = useState([]);

  const servName = async () => {
    const res = await getBusinessByUserAction(tokenResponse);
    setBussAct(res.data.service);
  };

  useEffect(() => {
    servName();
  }, [tokenResponse]);
  // const [adminService, setAdminService] = useState();

  // const [serviceName, setServiceName] = useState();
  // const getServiceByUser = async () => {
  //   const response = await getBusinessByUserAction(tokenResponse);
  //   console.log(response.data.service, "goalform");
  //   const filt =
  //     response &&
  //     response.data.service.length > 0 &&
  //     response.data.service.filter((val) => {
  //       if (val._id == service._id) {
  //         return setServiceName(val.service);
  //       }
  //     });
  //   console.log(filt, "filt");

  //   // setAdminService(response.data.service);
  // };

  // useEffect(() => {
  //   getServiceByUser();
  // }, [tokenResponse]);

  return (
    <div
      className={service.checked ? "showdetail service-goal" : "service-goal"}
    >
      <div className="goalcheckbox">
        <input
          type="checkbox"
          className="form-check-input"
          checked={service.checked}
          name="checked"
          onChange={(e) => {
            handleService(e, index);
          }}
        />
        <span className="name">
          {bussAct &&
            bussAct
              .filter((val) => val._id == service._id)
              .map((val) => val.service)}
        </span>

        {service.checked && (
          <div className="service-list-detail">
            <Form.Group className="mb-3">
              <Form.Label>How much do you charge for this service?</Form.Label>
              <Form.Control
                type="text"
                pattern="[0-9]*"
                name="serviceCharge"
                value={service.serviceCharge}
                onChange={(e) => {
                  handleService(e, index);
                }}
              />
              <span className="error">
                {error1[index] && error1[index].serviceCharge
                  ? error1[index].serviceCharge
                  : null}
              </span>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                How long does this service take to complete? (Service + Clean
                up)
              </Form.Label>
              <div className="service-time">
                <div>
                  <Form.Select
                    name="serviceHours"
                    onChange={(e) => {
                      handleService(e, index);
                    }}
                    value={service.serviceHours}
                  >
                    <option value="">Select Hours</option>
                    <option value="0">0 hours</option>

                    {[...Array.from(Array(13).keys())]
                      .slice(1)
                      .map((num, i) => (
                        <option key={i}>{num ? num + " hour" : ""}</option>
                      ))}
                  </Form.Select>

                  <span className="error">
                    {error1[index] && error1[index].serviceHours
                      ? error1[index].serviceHours
                      : null}
                  </span>
                </div>
                <div>
                  <Form.Select
                    name="serviceMinute"
                    onChange={(e) => {
                      handleService(e, index);
                    }}
                    value={service.serviceMinute}
                  >
                    <option value="">Select Minutes</option>
                    {[...Array.from(Array(4).keys())].slice(1).map((num, i) => (
                      <option key={i}>{num ? num * 15 + "minute" : ""}</option>
                    ))}

                    <span className="error">
                      {error1[index] && error1[index].serviceMinute
                        ? error1[index].serviceMinute
                        : null}
                    </span>
                  </Form.Select>
                </div>
              </div>
            </Form.Group>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};
export default GoalsServiceform;
