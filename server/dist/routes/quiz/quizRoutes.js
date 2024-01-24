"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _quizController = require("../../controller/quiz/quizController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();
Router.get("/", _quizController.welcomeQuiz);
Router.post("/create-quiz", _passport.default.authenticate("jwt", {
  session: false
}), _quizController.CreateQuiz);
Router.post("/submit-quiz", _passport.default.authenticate("jwt", {
  session: false
}), _quizController.SubmitQuiz);
Router.get("/allattemptedquizes", _passport.default.authenticate("jwt", {
  session: false
}), _quizController.getAllAttemptedQuizes);
var _default = exports.default = Router;