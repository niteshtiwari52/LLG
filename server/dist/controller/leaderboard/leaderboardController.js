"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserRank = void 0;
var _userDetails = require("../../database/userDetails");
const getUserRank = async (req, res) => {
  try {
    const userId = req.user;
    // Get all users sorted by averageScore and attemptedQuiz count
    const allUsers = await _userDetails.UserDetailModel.find().sort({
      averageScore: "desc",
      "attemptedQuiz.length": "desc" // Sorting by the number of attempted quizzes
    }).populate({
      path: "userID",
      select: "fullname" // Select the fields you want to populate
    });
    const allUserLeaderboarDetails = allUsers.map(userDetail => ({
      userId: userDetail.userID._id,
      userName: userDetail.userID.fullname,
      userAverageScore: Math.floor(userDetail.averageScore),
      userLeaderboardRank: userDetail.leaderboardRank,
      userTotalAttemptedQuizes: userDetail.attemptedQuiz.length
    }));
    const responsePayload = {
      userRank: "",
      leaderboardUsers: ""
    };
    res.status(200).json({
      success: true,
      message: "User Leaderboard fetched Successfully.",
      allUserLeaderboarDetails
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
exports.getUserRank = getUserRank;