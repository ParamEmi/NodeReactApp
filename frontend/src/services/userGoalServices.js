import axios from "axios";
import { apiBaseUrl } from "../constant/constant";

const token = localStorage.getItem("front_user_token");

export const getBusinessByUserAction = async (tokenResponse) => {
  try {
    const headerData = { Authorization: `Bearer ${tokenResponse}` };
    const response = await axios.get(
      `${apiBaseUrl}/frontend/company/getBussiness`,
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
