import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Types.ObjectId,
      ref: "question",
    },
    option: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const OptionModel = mongoose.model("option", OptionSchema);
