import express from "express";
import passport from "passport";
import {
  CreateQuiz,
  SubmitQuiz,
  welcomeQuiz,
} from "../../controller/quiz/quizController";

const Router = express.Router();

Router.get("/", welcomeQuiz);
Router.post(
  "/create-quiz",
  passport.authenticate("jwt", { session: false }),
  CreateQuiz
);

Router.post(
  "/submit-quiz",
  passport.authenticate("jwt", { session: false }),
  SubmitQuiz
);

export default Router;
