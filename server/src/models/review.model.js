import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const reviewSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      index: true,
    },

    category: {
      story: {
        review: { type: String },
        score: { type: Number },
      },
      graphic: {
        review: { type: String },
        score: { type: Number },
      },
      gameplay: {
        review: { type: String },
        score: { type: Number },
      },
      sound: {
        review: { type: String },
        score: { type: Number },
      },
    },
  },
  modelOptions
);
reviewSchema.index({ title: "text" });
const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;
