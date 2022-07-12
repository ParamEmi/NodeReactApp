import axios from "axios";
import { apiBaseUrl } from "../constant/constant";

const token = localStorage.getItem("admin_token");
const headerData = { Authorization: `Bearer ${token}` };

export const editAdmin = async (id) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/${id}`, {
      headers: headerData,
    });
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
