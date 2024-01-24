"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _passport = _interopRequireDefault(require("passport"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _connection = _interopRequireDefault(require("./database/connection"));
var _authorization = _interopRequireDefault(require("./config/authorization"));
var _welcomeRoutes = _interopRequireDefault(require("./routes/welcomeRoutes"));
var _auth = _interopRequireDefault(require("./routes/auth"));
var _user = _interopRequireDefault(require("./routes/user"));
var _leaderboardRoutes = _interopRequireDefault(require("./routes/leaderboard/leaderboardRoutes"));
var _questionRoutes = _interopRequireDefault(require("./routes/question/questionRoutes"));
var _quizRoutes = _interopRequireDefault(require("./routes/quiz/quizRoutes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Database Connection import

/**
 *  Importing Routes
 */

_dotenv.default.config();
(0, _authorization.default)(_passport.default);
const app = (0, _express.default)();
app.use(_express.default.json());
app.use((0, _expressSession.default)({
  secret: "process.env.JWT_SECRET",
  resave: false,
  saveUninitialized: true
}));
app.use(_passport.default.initialize());
app.use(_passport.default.session());
const PORT = process.env.PORT || 4000;
app.use((0, _cors.default)({
  origin: process.env.CLIENT_URL
}));
app.use((0, _helmet.default)());
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to LLG Server...."
  });
});
app.use("/api/v1/Welcome", _welcomeRoutes.default);
app.use("/api/v1/auth", _auth.default);
app.use("/api/v1/user", _user.default);
app.use("/api/v1/leaderboard", _leaderboardRoutes.default);
app.use("/api/v1/question", _questionRoutes.default);
app.use("/api/v1/quiz", _quizRoutes.default);
app.listen(PORT, () => {
  (0, _connection.default)().then(() => {
    console.log(`LLG Server is running on PORT: http://localhost:${PORT}\nDatabase Connected Succefully.....`);
  }).catch(error => {
    console.log("LLG Server is Running but Database connection failed !!!");
    console.log(error);
  });
});