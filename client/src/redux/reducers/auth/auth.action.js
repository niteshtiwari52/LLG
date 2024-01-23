import axios from "axios";

// Redux type
import {
  CLEAR_ERROR,
  SIGNIN_ERROR,
  SIGNUP_ERROR,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
} from "./auth.type";
const apiUrl = process.env.REACT_APP_API_URL;

export const signUpAction = (userData) => async (dispatch) => {
  try {
    const User = await axios({
      method: "POST",
      url: `${apiUrl}/api/v1/auth/signup`,
      data: { credentials: userData },
    });

    localStorage.setItem("llgUser", JSON.stringify({ token: User.data.token }));
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${User.data.token}`;
    return dispatch({ type: SIGN_UP, payload: User.data });
  } catch (error) {
    return dispatch({ type: SIGNUP_ERROR, payload: error.response.data });
  }
};

export const signInAction = (userData) => async (dispatch) => {
  try {
    // console.log("userData", userData);
    // console.log(Credential : userData)
    const User = await axios({
      method: "POST",
      url: `${apiUrl}/api/v1/auth/signin`,
      data: { credentials: userData },
    });

    localStorage.setItem("llgUser", JSON.stringify({ token: User.data.token }));

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${User.data.token}`;

    return dispatch({ type: SIGN_IN, payload: User.data });
  } catch (error) {
    return dispatch({ type: SIGNIN_ERROR, payload: error.response.data });
  }
};
export const clearAuthErrorAction = () => async (dispatch) => {
  try {
    return dispatch({ type: CLEAR_ERROR, payload: {} });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const signOutAction = () => async (dispatch) => {
  try {
    localStorage.removeItem("llgUser");
    // window.location.href = "http://localhost:3000";

    return dispatch({ type: SIGN_OUT, payload: {} });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
