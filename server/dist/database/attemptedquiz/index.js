"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttemptedQuizModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AttemptedQuizSchema = new _mongoose.default.Schema({
  userID: {
    type: _mongoose.default.Types.ObjectId,
    ref: "user",
    required: true
  },
  quizId: {
    type: _mongoose.default.Types.ObjectId,
    ref: "quiz"
  },
  selectedAnswers: [{
    questionId: {
      type: _mongoose.default.Types.ObjectId,
      ref: "question",
      // Replace with the actual reference name for your Question model
      required: true
    },
    selectedOptionId: {
      type: _mongoose.default.Types.ObjectId,
      ref: "option" // Replace with the actual reference name for your Option model
      // required: true,
    }
  }],
  score: {
    type: Number,
    required: true
  },
  feedback: {
    type: String
  },
  status: {
    type: String,
    default: "pending",
    required: true
  }
}, {
  timestamps: true
});
const AttemptedQuizModel = exports.AttemptedQuizModel = _mongoose.default.model("attemptQuizzes", AttemptedQuizSchema);