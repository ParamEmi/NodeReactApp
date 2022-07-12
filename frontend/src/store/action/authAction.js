import * as types from "../../types/auth";
import * as authService from "../../services/authServices";
import { ToastContainer } from "react-toastify";
import { createNotification } from "../../helper/notification";

export const loginUser = (user, navigate) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.LOGIN_USER });
      let response = await authService.loginUser(user);
      let dataObj = response.data.data;
      if (response.status === 200) {
        localStorage.setItem("front_user_token", dataObj.token);
        localStorage.setItem("front_user_id", dataObj.user._id);
        localStorage.setItem("business_Type_id", dataObj.user.businessType);
        createNotification("success", response.data.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
        dispatch({
          type: types.LOGIN_USER_SUCCESS,
          payload: response.data.data,
        });
        // createNotification("success", response.data.message);
        // setTimeout(() => {
        //   navigate("/dashboard");
        // }, 1000);
      } else {
        dispatch({
          type: types.LOGIN_USER_FAILURE,
          payload: response.data.message,
        });
        createNotification("error", response.data.message);
      }
    } catch (e) {
      dispatch({
        type: types.LOGIN_USER_FAILURE,
        payload: e.message,
      });
    }
  };
};
