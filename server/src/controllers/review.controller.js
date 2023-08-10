import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";
import overalReviewModel from "../models/overalReview.model.js";

const getReviewByID = async (req, res) => {
  try {
    const id = req.query;

    const response = await reviewModel.find({ id: id.id });

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};
const getOveralReviewByID = async (req, res) => {
  try {
    const id = req.query;

    let overal_review = await overalReviewModel.findOne({ id: id.id });
    if (!overal_review) {
      overal_review = {
        overal: "There is no review about this game",
        con_words: [],
        pos_words: [],
      };
    }

    responseHandler.ok(res, overal_review);
  } catch {
    responseHandler.error(res);
  }
};
export default { getReviewByID, getOveralReviewByID };
