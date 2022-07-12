import axios from "axios";
import { apiBaseUrl } from "../constant/constant";

const token = localStorage.getItem("front_user_token");
const headerData = { Authorization: `Bearer ${token}` };

export const getBusinessByUserAction = async () => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/frontend/company/getBussiness`,
      { headers: headerData }
    );
    // console.log(response, "response");
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
