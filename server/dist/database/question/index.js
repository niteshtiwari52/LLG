"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestionModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const QuestionSchema = new _mongoose.default.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    type: _mongoose.default.Types.ObjectId,
    ref: "option"
  }],
  correctOption: {
    type: _mongoose.default.Types.ObjectId,
    ref: "option"
  },
  language: {
    type: String,
    required: true
  },
  // difficulty : Easy , medium , hard
  difficulty: {
    type: String,
    required: true
  },
  // level : Begginer , Intermediate , Advance
  level: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
const QuestionModel = exports.QuestionModel = _mongoose.default.model("question", QuestionSchema);