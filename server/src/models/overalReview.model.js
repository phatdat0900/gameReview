import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const overalReviewSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      index: true,
    },

    overal: {
      type: String,
    },
  },
  modelOptions
);
overalReviewSchema.index({ title: "text" });
const overalReviewModel = mongoose.model("overal_reviews", overalReviewSchema);

export default overalReviewModel;
