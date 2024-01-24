"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserDetailModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UserDetailSchema = new _mongoose.default.Schema({
  userID: {
    type: _mongoose.default.Types.ObjectId,
    ref: "user",
    required: true
  },
  averageScore: {
    type: Number,
    required: true,
    default: 0
  },
  leaderboardRank: {
    type: Number,
    required: true
  },
  attemptedQuiz: [{
    type: _mongoose.default.Types.ObjectId,
    ref: "attemptedquizs"
  }]
}, {
  timestamps: true
});
const UserDetailModel = exports.UserDetailModel = _mongoose.default.model("userDetail", UserDetailSchema);