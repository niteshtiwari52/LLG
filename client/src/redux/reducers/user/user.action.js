import axios from "axios";
import { SELF, CLEAR_USER, GET_USER_DETAILS } from "./user.type";

export const getMyDetailsAction = () => async (dispatch) => {
  try {
    const User = await axios({
      method: "GET",
      url: `http://localhost:4000/api/v1/user/`,
    });
    // console.log(User);
    return dispatch({ type: SELF, payload: { ...User.data.user } });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const getUserDetailsAction = () => async (dispatch) => {
  try {
    const UserDetails = await axios({
      method: "GET",
      url: `http://localhost:4000/api/v1/user/userdetails`,
    });

    return dispatch({
      type: GET_USER_DETAILS,
      payload: { ...UserDetails.data.userDetails },
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
export const clearUserAction = () => async (dispatch) => {
  try {
    return dispatch({ type: CLEAR_USER, payload: {} });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
