import axios from "axios";
import { apiBaseUrl } from "../constant/constant";

const token = localStorage.getItem("front_user_token");
const headerData = { Authorization: `Bearer ${token}` };

export const getAllbussTypes = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/frontend/business/getAll`);
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

// export const getBusinessByUserAction = async () => {
//   try {
//     const response = await axios.get(
//       `${apiBaseUrl}/frontend/company/getBussiness`,
//       { headers: headerData }
//     );
//     if (response.status === 200) {
//       return response.data;
//     } else {
//       throw new Error(response.message);
//     }
//   } catch (err) {
//     return {
//       data: "",
//       response: err.message,
//       status: 400,
//     };
//   }
// };

export const additionalBusinessService = async (data, tokenResponse) => {
  const headerData1 = { Authorization: `Bearer ${tokenResponse}` };

  try {
    const response = await axios.post(
      `${apiBaseUrl}/admin/businessService/create`,
      data,
      { headers: headerData1 }
    );
    return response.data;
  } catch (err) {
    return {
      data: "",
      status: 400,
      message: err.message,
    };
  }
};

export const getServicesByUserId = async (id) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/admin/businessService/getByUserId/${id}`,
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
