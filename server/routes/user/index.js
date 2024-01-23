import express from "express";
import { getUser, getUserDetails } from "../../controller/user/userController";
import passport from "passport";

const Router = express.Router();

Router.get("/", passport.authenticate("jwt", { session: false }), getUser);
Router.get(
  "/userdetails",
  passport.authenticate("jwt", { session: false }),
  getUserDetails
);

export default Router;
