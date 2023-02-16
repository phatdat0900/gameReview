import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddlerware from "../middlewares/token.middleware.js";
import gameModel from "../models/game.moldel.js";
import Sentiment from "sentiment";

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
    const { mediaType, mediaId } = req.params;

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

export default { getList, getGenres, search, getDetail };
