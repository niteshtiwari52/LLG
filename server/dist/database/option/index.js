"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const OptionSchema = new _mongoose.default.Schema({
  questionId: {
    type: _mongoose.default.Types.ObjectId,
    ref: "question"
  },
  option: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
const OptionModel = exports.OptionModel = _mongoose.default.model("option", OptionSchema);