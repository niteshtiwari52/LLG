import express from "express";
import { Welcome } from "../controller/welcomeController";

const Router = express.Router();

Router.get("/greet", Welcome);

export default Router;
