import express from "express";
import {
  CreateQuestion,
  welcomeQuestion,
} from "../../controller/question/questionController";

const Router = express.Router();

Router.get("/", welcomeQuestion);
Router.post("/create-questions", CreateQuestion);

export default Router;
