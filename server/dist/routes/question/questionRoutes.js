"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _questionController = require("../../controller/question/questionController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();
Router.get("/", _questionController.welcomeQuestion);
Router.post("/create-questions", _questionController.CreateQuestion);
var _default = exports.default = Router;