import mongoose from "mongoose";
import modelOptions from "./model.options.js";

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    plasform: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    genre: {
      type: String,
      required: true,
      select: false,
    },
    detail: {
      type: String,
    },
    reviews: {
      comment: {
        type: String,
      },
    },
  },
  modelOptions
);

const gameModel = mongoose.model("Game", gameSchema);

export default gameModel;
