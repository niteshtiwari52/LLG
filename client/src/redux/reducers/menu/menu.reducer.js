import { SELECT_MENU } from "./menu.type";

const initialState = {
  features: {
    featureId: "1",
    featureName: "User Detail",
    featureUrl: "user-details",
    featureIcon: "FaUser",
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_MENU:
      return {
        ...state,
        features: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
