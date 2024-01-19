import mongoose from "mongoose";

const AttemptedQuizSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    quizId: {
      type: mongoose.Types.ObjectId,
      ref: "quizs",
    },
    selectedAnswers: [
      {
        questionId: {
          type: mongoose.Types.ObjectId,
          ref: "questions", // Replace with the actual reference name for your Question model
          required: true,
        },
        selectedOptionId: {
          type: mongoose.Types.ObjectId,
          ref: "options", // Replace with the actual reference name for your Option model
          // required: true,
        },
      },
    ],
    score: {
      type: Number,
      required: true,
    },
    feedback: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AttemptedQuizModel = mongoose.model(
  "attemptQuizzes",
  AttemptedQuizSchema
);
