import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    questions: [{ type: mongoose.Types.ObjectId, ref: questions }],
  },
  {
    timestamps: true,
  }
);

export const QuizModel = mongoose.model("quiz", QuizSchema);
