"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuizModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const QuizSchema = new _mongoose.default.Schema({
  questions: [{
    type: _mongoose.default.Types.ObjectId,
    ref: "question"
  }]
}, {
  timestamps: true
});
const QuizModel = exports.QuizModel = _mongoose.default.model("quiz", QuizSchema);