// import axios from "axios";
import { SELECT_MENU } from "./menu.type";

export const selectMenuAction = (featureData) => async (dispatch) => {
  try {
    return dispatch({ type: SELECT_MENU, payload: { ...featureData } });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
