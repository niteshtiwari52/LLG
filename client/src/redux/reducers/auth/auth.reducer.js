import {
  CLEAR_ERROR,
  SIGNIN_ERROR,
  SIGNUP_ERROR,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
} from "./auth.type";

const initialState = {
  signupError: {},
  signinError: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };

    case SIGN_UP:
      return {
        ...state,
        ...action.payload,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signupError: action.payload,
      };
    case SIGNIN_ERROR:
      return {
        ...state,
        signinError: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        signupError: {},
        signinError: {},
      };

    case SIGN_OUT:
      return {
        ...state,
        signupError: {},
        signinError: {},
      };

    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
