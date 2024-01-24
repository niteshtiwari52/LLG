"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _leaderboardController = require("../../controller/leaderboard/leaderboardController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();
Router.get("/userrank", _passport.default.authenticate("jwt", {
  session: false
}), _leaderboardController.getUserRank);
var _default = exports.default = Router;