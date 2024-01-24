"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = void 0;
var _user = require("../../database/user");
var _userDetails = require("../../database/userDetails");
const signUp = async (req, res) => {
  try {
    await _user.UserModel.isUserExist(req.body.credentials);
    const newUser = await _user.UserModel.create(req.body.credentials);
    const totalUser = await _user.UserModel.find();
    // console.log(totalUser);
    const newUserDetailsData = {
      userID: newUser._id,
      averageScore: 0,
      leaderboardRank: totalUser.length,
      attemptedQuiz: []
    };
    const newUserDetails = await _userDetails.UserDetailModel.create(newUserDetailsData);
    const token = newUser.generateJwtToken();
    return res.status(200).json({
      success: true,
      message: "User Registration Successful...",
      token
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
  try {
    // console.log(req.body);

    const user = await _user.UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();
    return res.status(200).json({
      success: true,
      message: "User Logged In Successfully..",
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
exports.signIn = signIn;