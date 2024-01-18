import express from "express";
import { getUser } from "../../controller/user/userController";
import passport from "passport";

const Router = express.Router();

Router.get("/", passport.authenticate("jwt", { session: false }), getUser);

export default Router;
