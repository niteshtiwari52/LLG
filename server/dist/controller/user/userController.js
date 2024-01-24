"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserDetails = exports.getUser = void 0;
var _userDetails = require("../../database/userDetails");
const getUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      user
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
      message: "Un-Authorize Access...Please Sign In again"
    });
  }
};
exports.getUser = getUser;
const getUserDetails = async (req, res) => {
  try {
    const User = req.user;
    // const userId = User._id;
    // console.log(userId);
    const userDetail = await _userDetails.UserDetailModel.findOne({
      userID: User._id
    });
    const userDetails = {
      userId: User._id,
      userName: User.fullname,
      userEmail: User.email,
      userAverageScore: userDetail.averageScore,
      userLeaderboardRank: userDetail.leaderboardRank,
      userTotalAttemptedQuizes: userDetail.attemptedQuiz.length,
      userAttemptedQuizes: userDetail.attemptedQuiz

      // userAccountCreatedAt : User.createdAt
    };
    res.status(200).json({
      success: true,
      userDetails
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
      // message: "Un-Authorize Access...Please Sign In again",
    });
  }
};
exports.getUserDetails = getUserDetails;