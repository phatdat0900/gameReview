import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import rawgApi from "../rawg/rawg.api.js";
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
    const page = req.query;

    const response = await rawgApi.gameList({ page: page.page });
    const data = [];
    response.results.forEach((e) => {
      data.push({
        id: e.id,
        title: e.name,
        img: e.background_image,
        platforms: e.parent_platforms,
      });
    });

    return responseHandler.ok(res, data);

    // const response = await gameModel.find(
    //   {},
    //   { title: 1, plasform: 1, img: 1 }
    // );

    // return responseHandler.ok(res, response);
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
const getReviewByID = async (req, res) => {
  try {
    const id = req.query;
    console.log(id);
    const response = await reviewModel.find({ id: id.id });
    console.log(response);

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    // const { mediaId } = req.params;

    // const response = await gameModel.findById({ _id: mediaId });

    // result.push([i, response.reviews[i].comment]);

    // console.log(result);
    // const reviews = response.reviews.map((item) => {
    //   const topics = [];
    //   entries.forEach((e) => {
    //     if (checkWordInSentences(item.comment, e[1])) {
    //       topics.push(e[0]);
    //     }
    //   });
    //   let result = sentiment.analyze(item.comment);
    //   return {
    //     comment: item.comment,
    //     auth: item.auth,
    //     link: item.link,
    //     topics: topics,
    //     score: result,
    //   };
    // });

    // // console.log(score);
    // const data = {
    //   title: response.title,
    //   plasform: response.plasform,
    //   img: response.img,
    //   genre: response.genre,
    //   detail: response.detail,
    //   reviews,
    // };

    const id = req.query;

    const response = await rawgApi.gameDetail(id.id);
    const reviews = await reviewModel.find({ id: id.id });
    const screenshotAPIs = await rawgApi.gameScreenshots(id.id);

    const screenshots = screenshotAPIs.results.reduce(
      (accum, obj) => [...accum, obj.image],
      []
    );
    const genres = await response.genres.reduce(
      (accum, obj) => [...accum, obj.name],
      []
    );
    const platforms = await response.platforms.reduce(
      (accum, obj) => [...accum, obj.platform.name],
      []
    );
    const data = {
      title: response.name,
      plasform: platforms,
      img: response.background_image,
      genres: genres,
      detail: response.description,
      background_image: response.background_image_additional,
      screenshots: screenshots,
      reviews: reviews,
    };
    console.log(data);
    responseHandler.ok(res, data);
  } catch (e) {
    console.log(e);
    responseHandler.error(res);
  }
};
const getEvaluateReviews = async (req, res) => {
  try {
    const data = { review: "" };
    let reviewAnalys = [];
    const { mediaId } = req.params;
    const response = await gameModel.findById({ _id: mediaId });
    data.name = response.title;
    const reviewSplit = response.reviews.map((item) => {
      const sentences = item.comment.match(/[^.?!]+[.!?]+[\])'"`’”]*/g);

      const analysSentences = sentences.map((e) => {
        let result = sentiment.analyze(e);
        if (result.calculation.length != 0) {
          return { sentence: e, score: result.score, topics: [] };
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
          review.topics.push(e[0]);
        }
      });
      data[e[0]] = score;
    });
    const topicsReview = reviewAnalys
      .filter((e) => {
        if (e.topics.length > 0) {
          return e;
        }
      })
      .map((e) => e.sentence);
    topicsReview.forEach((e) => {
      data.review = data.review + e;
    });

    data.review = generateReview(data);
    console.log(data);
    responseHandler.ok(res, data);
  } catch (e) {
    responseHandler.error(res);
  }
};

function checkWordInSentences(string, words) {
  let check = false;
  words.forEach((word) => {
    if (string.includes(word)) {
      check = true;
    }
  });
  return check;
}
function generateReview(data) {
  let review = ` ${data.name} have`;
  const keys = Object.keys(data);
  const vals = Object.values(data);

  keys.forEach((e) => {
    if (data[e] > 20) {
      review = review + " excellent " + e + ",";
    } else if (data[e] > 10) {
      review = review + " great " + e + ",";
    } else if (data[e] > 0) {
      review = review + " good " + e + ",";
    } else if (data[e] < 0) {
      review = review + " not really good " + e + ",";
    }
  });

  review = review.substring(0, review.length - 1) + ". " + data.review;
  if (data.graphic === 0 && data.story === 0 && data.gameplay === 0) {
    review = "This game dont have any reivews";
  }
  return review;
}

export default {
  getList,
  getGenres,
  search,
  getDetail,
  getEvaluateReviews,
  getReviewByID,
};
