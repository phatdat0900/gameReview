import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddlerware from "../middlewares/token.middleware.js";
import gameModel from "../models/game.moldel.js";
import Sentiment from "sentiment";
import { category } from "../category.js";
const entries = Object.entries(category);
var sentiment = new Sentiment();

const getList = async (req, res) => {
  try {
    // const { page } = req.query;
    // const { mediaType, mediaCategory } = req.params;

    const response = await gameModel.find(
      {},
      { title: 1, plasform: 1, img: 1 }
    );

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const search = async (req, res) => {
  try {
    const title = req.query.query;

    const query = { $text: { $search: title } };
    const response = await gameModel.find(query, {
      title: 1,
      plasform: 1,
      img: 1,
    });

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaId } = req.params;

    const response = await gameModel.findById({ _id: mediaId });

    // result.push([i, response.reviews[i].comment]);

    // console.log(result);
    const reviews = response.reviews.map((item) => {
      let result = sentiment.analyze(item.comment);
      return {
        comment: item.comment,
        auth: item.auth,
        link: item.link,
        score: result,
      };
    });

    // console.log(score);
    const data = {
      title: response.title,
      plasform: response.plasform,
      img: response.img,
      genre: response.genre,
      detail: response.detail,
      reviews,
    };

    responseHandler.ok(res, data);
  } catch (e) {
    console.log(e);
    responseHandler.error(res);
  }
};
const getEvaluateReviews = async (req, res) => {
  try {
    const data = {};
    let reviewAnalys = [];
    const { mediaId } = req.params;
    const response = await gameModel.findById({ _id: mediaId });

    const reviewSplit = response.reviews.map((item) => {
      const sentences = item.comment.match(/[^.?!]+[.!?]+[\])'"`’”]*/g);

      const analysSentences = sentences.map((e) => {
        let result = sentiment.analyze(e);
        if (result.calculation.length != 0) {
          return { sentence: e, score: result.score };
        }
      });
      return analysSentences;
    });

    for (let i = 0; i < reviewSplit.length; i++) {
      reviewAnalys = reviewAnalys.concat(reviewSplit[i].filter(Boolean));
    }

    entries.forEach((e) => {
      let score = 0;
      reviewAnalys.forEach((review) => {
        if (checkWordInSentences(review.sentence, e[1])) {
          score = score + review.score;
        }
      });
      data[e[0]] = score;
    });
    const review = generateReview(data);
    responseHandler.ok(res, review);
  } catch (e) {
    console.log(e);
    responseHandler.error(res);
  }
};

function checkWordInSentences(string, words) {
  let check = false;
  // for (const word of words) {
  //   console.log(word);
  //   return string.includes(word);
  // }
  words.forEach((word) => {
    if (string.includes(word)) {
      check = true;
    }
  });
  return check;
}
function generateReview(data) {
  let review = "After analyzing the reviews of this game, this game have";
  const keys = Object.keys(data);
  const vals = Object.values(data);
  if (vals.every((e) => e == 0)) {
    review =
      review +
      " no specific assessment on each aspect or there are many controversial issues about this game";
  } else {
    keys.forEach((e) => {
      if (data[e] > 20) {
        review = review + " excellent " + e;
      } else if (data[e] > 10) {
        review = review + " great " + e;
      } else if (data[e] > 0) {
        review = review + " good " + e;
      } else if (data[e] < 0) {
        review = review + " not really good " + e;
      }
    });
  }
  console.log(review);
  return review;
}

export default { getList, getGenres, search, getDetail, getEvaluateReviews };
