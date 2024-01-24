"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _passportJwt = _interopRequireDefault(require("passport-jwt"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _allModels = require("../database/allModels");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const JWTStrategy = _passportJwt.default.Strategy;
const ExtractJwt = _passportJwt.default.ExtractJwt;

// Head : {
//      Authorization  : "Bearer jifowejksuhbduwihuirujbointsex9"
// }

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};
var _default = passport => {
  passport.use(new JWTStrategy(options, async (jwt__payload, done) => {
    try {
      const doesUserExist = await _allModels.UserModel.findById(jwt__payload.user);
      if (!doesUserExist) return done(null, false);
      return done(null, doesUserExist);
    } catch (error) {
      throw new Error(error);
    }
  }));
};
exports.default = _default;