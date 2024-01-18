import express from "express";
import { UserModel } from "../../database/allModels";
import { signIn, signUp } from "../../controller/auth/authController";

const Router = express.Router();

Router.post("/signup", signUp);
Router.post("/signin", signIn);

export default Router;
