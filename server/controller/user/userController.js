import { UserDetailModel } from "../../database/userDetails";

export const getUser = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
      message: "Un-Authorize Access...Please Sign In again",
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const User = req.user;
    // const userId = User._id;
    // console.log(userId);
    const userDetail = await UserDetailModel.findOne({ userID: User._id });

    const userDetails = {
      userId: User._id,
      userName: User.fullname,
      userEmail: User.email,
      userAverageScore: userDetail.averageScore,
      userLeaderboardRank: userDetail.leaderboardRank,
      userTotalAttemptedQuizes: userDetail.attemptedQuiz.length,
      userAttemptedQuizes: userDetail.attemptedQuiz,

      // userAccountCreatedAt : User.createdAt
    };
    res.status(200).json({
      success: true,
      userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      // message: "Un-Authorize Access...Please Sign In again",
    });
  }
};
