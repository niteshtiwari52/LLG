"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Welcome = void 0;
const Welcome = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Welcome to LLG Routed Server...."
    });
  } catch (error) {
    res.status(404).json({
      success: true,
      message: "An Error Occured"
    });
  }
};
exports.Welcome = Welcome;