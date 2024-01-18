import mongoose from "mongoose";

const UserDetailSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

export const UserDetailModel = mongoose.model("userDetail", UserDetailSchema);
