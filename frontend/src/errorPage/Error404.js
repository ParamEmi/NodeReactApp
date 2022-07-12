import React from "react";
import errorimg from "../images/icons8-errors-report-50.png";

const Error404 = () => {
  return (
    <h4
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "150px",
      }}
    >
      <i>
        <span style={{ color: "red", fontSize: "30px" }}>Error</span> page not
        found :<span style={{ color: "red", fontSize: "25px" }}> 404 ... </span>
      </i>
      <div>
      <img src={errorimg} alt="image not found" />
      </div>
    </h4>
  );
};

export default Error404;
