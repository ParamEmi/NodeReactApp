import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import * as businessService from "../services/businessServices";
import _ from "lodash";
import { createNotification } from "../helper/notification";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

export const BusinessServiceModal = (props) => {
  const [show, setShow] = useState(false);
  const [addService, setAddService] = useState({
    service: "",
  });
  const [error, setError] = useState([]);
  const typeId = localStorage.getItem("business_Type_id");

  let tokenResponse = useSelector((state) => state.auth.token);
  const formValidation = () => {
    const { service } = addService;
    let formErrors = {};
    let isValid = true;
    if (!service) {
      isValid = false;
      formErrors["service"] = "Please Enter Service";
    }
    setError(formErrors);
    return isValid;
  };

  useEffect(() => {
    props.getServiceByUser();
  }, [tokenResponse]);

  const clickHandleAddService = async (e) => {
    if (formValidation()) {
      try {
        const serviceObj = {
          service: addService.service,
          businessTypeId: typeId,
        };

        const response = await businessService.additionalBusinessService(
          serviceObj,
          tokenResponse
        );
        if (response.status === 400) {
          createNotification("error", response.message);
          //   props.modalStatus();
        } else {
          createNotification("success", response.message);
          setShow(false);
          props.getFunction();
          //   props.modalStatus();
          setAddService("");
        }
        props.getServiceByUser(tokenResponse);
      } catch (err) {
        console.log(err.message);
      }
    }
    props.getServiceByUser();
  };

  const handleShow = () => setShow(true);

  const handleCloseOnCloseButton = () => {
    setShow(false);
    setAddService("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddService({
      ...addService,
      [name]: value,
    });
  };

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Add Additional Service
      </Button>
      <Modal
        show={show}
        className="service-modal"
        onHide={handleCloseOnCloseButton}
      >
        <Modal.Header>
          <Modal.Title>Add Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="popup-form-box">
            <label className="form-label">Service</label>
            <input
              className="input1"
              type="text"
              name="service"
              placeholder="Service"
              value={addService.service}
              onChange={handleChange}
            />
            <span className="form-error">{error.service}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOnCloseButton}>
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={clickHandleAddService}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} />
    </>
  );
};
