import axios from "axios";
import { apiBaseUrl } from "../constant/constant";

export const register = async (data) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/frontend/signup`, data);
    if (response.status == 201) {
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

export const accountActivationAction = async (token) => {
 try {
    let response = await axios.patch(`${apiBaseUrl}/frontend/activate/${token}`);
    if (response.status == 200) {
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


export const login = async (data) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/frontend/login`, data);
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

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/frontend/forgot`, email);
    if (response.status == 200) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    return {
      data: "",
      status: 400,
      response: err.message,
    };
  }
};

export const loginUser = async (user) => {
  return await axios.post(`${apiBaseUrl}/frontend/login`, { ...user });
};

export const resetPassword = async (data) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/frontend/resetPassword`,
      data
    );
    if (response.status == 200) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    return {
      data: "",
      status: 400,
      response: err.message,
    };
  }
};
