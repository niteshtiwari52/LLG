"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcryptjs = _interopRequireWildcard(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UserSchema = new _mongoose.default.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    select: false
  }
}, {
  timestamps: true
});

// Attachments : Genrating a JWT Token
UserSchema.methods.generateJwtToken = function () {
  return _jsonwebtoken.default.sign({
    user: this._id.toString()
  }, process.env.JWT_SECRET);
};

//   Encrypting the user Password
UserSchema.pre("save", function (next) {
  // gives the data of current user
  const user = this;

  //password is modified
  if (!user.isModified("password")) return next();

  //generate bcrypt salt : means mkaing encrypting password more stronger
  _bcryptjs.default.genSalt(8, (error, salt) => {
    if (error) return next(error);

    // hash the password
    _bcryptjs.default.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      // assigning hashed password
      user.password = hash;
      return next();
    });
  });
});

// Helper Function :
UserSchema.statics.isUserExist = async ({
  email
}) => {
  const isEmailExist = await UserModel.findOne({
    email
  });
  if (isEmailExist) {
    // return res.status(404).json({
    //   success: false,
    //   message: "User already Exists...",
    // });
    throw new Error("User already Exists....");
  }
};
UserSchema.statics.findByEmailAndPassword = async ({
  email,
  password
}) => {
  const user = await UserModel.findOne({
    email
  }).select("password");
  if (!user) {
    // return res.status(404).json({
    //   success: false,
    //   message: "User does not Exists.... !",
    // });
    throw new Error("User does not Exists.... !");
  }

  // compare password
  const doesPasswordMatch = await _bcryptjs.default.compare(password, user.password);
  if (!doesPasswordMatch) {
    throw new Error("Invalid Credentials !!!");
  }
  return user;
};
const UserModel = exports.UserModel = _mongoose.default.model("user", UserSchema);