import mongoose from "mongoose";
import modelOptions from "./model.options.js";

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      index: true,
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
    },
    detail: {
      type: String,
    },
    reviews: [
      {
        auth: {
          type: String,
        },
        comment: {
          type: String,
        },
        link: {
          type: String,
        },
      },
    ],
  },
  modelOptions
);
gameSchema.index({ title: "text" });
const gameModel = mongoose.model("Game", gameSchema);

export default gameModel;
