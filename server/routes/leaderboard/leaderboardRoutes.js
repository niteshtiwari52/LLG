import express from "express";

import passport from "passport";
import { getUserRank } from "../../controller/leaderboard/leaderboardController";

const Router = express.Router();

Router.get(
  "/userrank",
  passport.authenticate("jwt", { session: false }),
  getUserRank
);

export default Router;
