import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema(
  {
    option: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const OptionModel = mongoose.model("option", OptionSchema);
