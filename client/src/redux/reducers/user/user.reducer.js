import { SELF, CLEAR_USER, GET_USER_DETAILS } from "./user.type";

const initialState = {
  selfUser: null,
  selfUserDetails: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELF:
      return {
        ...state,
        selfUser: action.payload,
      };
    case GET_USER_DETAILS:
      return {
        ...state,
        selfUserDetails: action.payload,
      };
    case CLEAR_USER:
      return {
        selfUser: null,
        selfUserDetails: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
