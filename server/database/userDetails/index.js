import mongoose from "mongoose";

const UserDetailSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    averageScore: {
      type: Number,
      required: true,
      default: 0,
    },
    leaderboardRank: {
      type: Number,
      required: true,
    },
    attemptedQuiz: [
      {
        type: mongoose.Types.ObjectId,
        ref: attemptedquizs,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const UserDetailModel = mongoose.model("userDetail", UserDetailSchema);
