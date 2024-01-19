import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    questions: [{ type: mongoose.Types.ObjectId, ref: "question" }],
  },
  {
    timestamps: true,
  }
);

export const QuizModel = mongoose.model("quiz", QuizSchema);
