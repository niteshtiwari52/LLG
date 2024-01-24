"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _allModels = require("../../database/allModels");
var _authController = require("../../controller/auth/authController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();
Router.post("/signup", _authController.signUp);
Router.post("/signin", _authController.signIn);
var _default = exports.default = Router;