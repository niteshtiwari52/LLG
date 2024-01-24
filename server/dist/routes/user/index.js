"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../../controller/user/userController");
var _passport = _interopRequireDefault(require("passport"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();
Router.get("/", _passport.default.authenticate("jwt", {
  session: false
}), _userController.getUser);
Router.get("/userdetails", _passport.default.authenticate("jwt", {
  session: false
}), _userController.getUserDetails);
var _default = exports.default = Router;