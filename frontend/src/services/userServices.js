import axios from "axios";
import { apiBaseUrl } from "../constant/constant";

const token = localStorage.getItem("admin_token");
const headerData = { Authorization: `Bearer ${token}` };

export const addUser = async (data) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/frontend/user/create`,
      data,
      { headers: headerData }
    );
    if (response.status == 200) {
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

export const getUser = async (pageNo, limit) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/frontend/user/get/${pageNo}/${limit}`,
      { headers: headerData }
    );
    if (response.status == 200) {
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

export const removeUser = async (id) => {
  try {
    const response = await axios.delete(
      `${apiBaseUrl}/frontend/user/remove/${id}`,
      { headers: headerData }
    );
    if (response.status == 200) {
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

export const editUser = async (id, data) => {
  try {
    const response = await axios.put(
      `${apiBaseUrl}/frontend/user/edit/${id}`,
      data,
      { headers: headerData }
    );
    if (response.status == 200) {
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

export const searchUser = async (pageNo, limit, text) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/frontend/user/search/${pageNo}/${limit}/${text}`,
      { headers: headerData }
    );
    if (response.status == 200) {
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

export const changeLoginStatus = async (obj) => {
  let token = localStorage.getItem("front_user_token");
  const response = await axios.put(
    `${apiBaseUrl}/frontend/user/loginStatus`,
    obj,

    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const GetUserByID = async (id) => {
  console.log(id, "dd");
  try {
    const response = await axios.get(
      `${apiBaseUrl}/frontend/getUser/${id}`,

      { headers: headerData }
    );
    if (response.status == 200) {
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
