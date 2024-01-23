import { CLEAR_LEADERBOARD, FETCH_LEADERBOARD } from "./leaderboard.type";

const initialState = {
  leaderboardUsers: [],
};

const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEADERBOARD:
      return {
        ...state,
        leaderboardUsers: action.payload,
      };
    case CLEAR_LEADERBOARD:
      return {
        leaderboardUsers: [],
      };

    default:
      return {
        ...state,
      };
  }
};

export default leaderboardReducer;
