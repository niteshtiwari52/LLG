import { UserModel } from "../../database/user";
import { UserDetailModel } from "../../database/userDetails";

export const signUp = async (req, res) => {
  try {
    await UserModel.isUserExist(req.body.credentials);

    const newUser = await UserModel.create(req.body.credentials);

    const totalUser = await UserModel.find();
    // console.log(totalUser);
    const newUserDetailsData = {
      userID: newUser._id,
      averageScore: 0,
      leaderboardRank: totalUser.length,
      attemptedQuiz: [],
    };
    const newUserDetails = await UserDetailModel.create(newUserDetailsData);
    const token = newUser.generateJwtToken();
    return res.status(200).json({
      success: true,
      message: "User Registration Successful...",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    // console.log(req.body);

    const user = await UserModel.findByEmailAndPassword(req.body.credentials);

    const token = user.generateJwtToken();
    return res.status(200).json({
      success: true,
      message: "User Logged In Successfully..",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
