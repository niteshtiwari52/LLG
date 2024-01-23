import axios from "axios";
import { CLEAR_LEADERBOARD, FETCH_LEADERBOARD } from "./leaderboard.type";
const apiUrl = process.env.REACT_APP_API_URL;

export const leaderboardDetailsAction = () => async (dispatch) => {
  try {
    const LeaderboardDetails = await axios({
      method: "GET",
      url: `${apiUrl}/api/v1/leaderboard/userrank`,
    });

    return dispatch({
      type: FETCH_LEADERBOARD,
      payload: LeaderboardDetails.data.allUserLeaderboarDetails,
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const clearLeaderboardAction = () => async (dispatch) => {
  try {
    return dispatch({ type: CLEAR_LEADERBOARD, payload: [] });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
