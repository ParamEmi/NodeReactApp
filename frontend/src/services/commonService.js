import axios from "axios";
import { apiBaseUrl } from "../constant/constant";

const token = localStorage.getItem("front_user_token");
const headerData = { Authorization: `Bearer ${token}` };

export const savePersonalBudgetAction = async (data, tokenResponse) => {
  console.log(data, "data");
  const headerData1 = { Authorization: `Bearer ${tokenResponse}` };

  try {
    const response = await axios.post(
      `${apiBaseUrl}/frontend/personal/saveBudget`,
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

export const editPersonalBudgetAction = async (id, data) => {
  try {
    const response = await axios.put(
      `${apiBaseUrl}/frontend/personal/editPersonalBudget/${id}`,
      data,
      { headers: headerData }
    );
    if (response.status === 200) {
      return response.data;
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

export const getPersonalBudgetAction = async (tokenResponse) => {
  console.log(tokenResponse, "sss");
  const headerData2 = { Authorization: `Bearer ${tokenResponse}` };
  try {
    const response = await axios.get(
      `${apiBaseUrl}/frontend/personal/getBudget`,
      { headers: headerData2 }
    );
    if (response.status === 200) {
      return response.data;
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
