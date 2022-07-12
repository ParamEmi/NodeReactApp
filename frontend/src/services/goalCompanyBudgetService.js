import axios from "axios";
import { apiBaseUrl } from "../constant/constant";
import { useSelector } from "react-redux";

const token = localStorage.getItem("front_user_token");
console.log(token, "token");
const headerData = { Authorization: `Bearer ${token}` };

export const saveGoalBudgetAction = async (data, tokenresponse) => {
  const headerData1 = { Authorization: `Bearer ${tokenresponse}` };
  console.log(headerData1, "headerData");

  try {
    const response = await axios.post(
      `${apiBaseUrl}/frontend/company/saveBudget`,
      data,
      { headers: headerData1 }
    );
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    return {
      data: "",
      response: err.message,
      status: 400,
    };
  }
};

export const GoalsById = async (id, tokenresponse) => {
  console.log(tokenresponse, id, "token");
  const headerData2 = { Authorization: `Bearer ${tokenresponse}` };

  console.log(headerData2, "headerData");
  console.log(id, "iddd");
  try {
    const response = await axios.get(
      `${apiBaseUrl}/frontend/company/getBudgetById/${id}`,

      { headers: headerData2 }
    );
    // if (response.status === 200) {
    return response;
    // } else {
    // throw new Error(response.message);
    // }
  } catch (err) {
    return {
      data: "",
      response: err.message,
      status: 400,
    };
  }
};

export const GoalsData = async (id) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/frontend/company/getcompanyGoalBudget`,

      { headers: headerData }
    );
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    return {
      data: "",
      response: err.message,
      status: 400,
    };
  }
};
