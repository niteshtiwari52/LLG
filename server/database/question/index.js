import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: [{ type: mongoose.Types.ObjectId, ref: options }],
    correctOption: { type: mongoose.Types.ObjectId, ref: options },
    language: { type: String, required: true },
    // difficulty : Easy , medium , hard
    difficulty: { type: String, required: true },
    // level : Begginer , Intermediate , Advance
    level: { type: String, required: true },
  },
  { timestamps: true }
);

export const QuestionModel = mongoose.model("question", QuestionSchema);
