import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import HeaderTop from "../components/HeaderTop";
import Sidebarmenu from "../components/Sidebarmenu";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import * as adminServices from "../services/adminServices";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    name: "raja",
    email: "raja@mail.com",
    state: "Punjab",
  });
  const [data, setData] = useState({
    facebook: false,
    insta: false,
    twitter: false,
  });
  const [adminBio, setAdminBio] = useState("It was a dark and stormy night...")
  const { facebook, insta, twitter } = data;  
  const getData = async () => {
    const admin_id = localStorage.getItem("user_id");
    // const response = await adminServices.editAdmin(admin_id)
    // setAdminData(response.data)
  };
  const handleUpdate = () =>{
//UPDATE USER API HERE..
navigate("/dashboard")
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <HeaderTop />
      <div className="dashboard-wrapper">
        <Container>
          <div className="dashboard-content">
            <div className="sidebarmenu">
              <Sidebarmenu />
            </div>
            <div className="container">
              <div className="row">
                <div className="col">Photo</div>
                <div className="col">
                  <input type="file" />
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">Display Name</div>
                <div className="col">{adminData && adminData.name}</div>
              </div>
              <hr />
              <div className="row">
                <div className="col">Email Address</div>
                <div className="col">{adminData && adminData.email}</div>
              </div>
              <hr />
              <div className="row">
                <div className="col">Location</div>
                <div className="col">{adminData && adminData.state}</div>
              </div>
              <hr />
              <div className="row">
                <div className="col">Bio</div>
                <div className="col">
                  <textarea name="bio" value={adminBio} rows="3" cols="25" onChange={(e) => setAdminBio(e.target.value)}>
                    {adminBio}
                  </textarea>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">Link to Facebook</div>
                <div className="col">
                  <BootstrapSwitchButton
                    checked={facebook}
                    onstyle="success"
                    offstyle="info"
                    size="sm"
                    onChange={() => {
                      setData({ facebook: !facebook });
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col">Link to Instagram</div>
                <div className="col">
                  <BootstrapSwitchButton
                    checked={insta}
                    onstyle="success"
                    offstyle="info"
                    size="sm"
                    onChange={() => {
                      setData({ insta: !insta });
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col">Link to Twitter</div>
                <div className="col">
                  <BootstrapSwitchButton
                    checked={twitter}
                    onstyle="success"
                    offstyle="info"
                    size="sm"
                    onChange={() => {
                      setData({ twitter: !twitter });
                    }}
                  />
                </div>
              </div>
            <Button variant="secondary" onClick={handleUpdate}>Update</Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Settings;
