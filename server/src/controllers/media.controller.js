import responseHandler from "../handlers/response.handler.js";
import rawgApi from "../rawg/rawg.api.js";
import reviewModel from "../models/review.model.js";
import overalReviewModel from "../models/overalReview.model.js";

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
  } catch {
    responseHandler.error(res);
  }
};

const getListByContent = async (req, res) => {
  try {
    const { type } = req.params;
    const response = await rawgApi.gameListByConent({
      parent_platforms: type,
      page: 2,
    });
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
  } catch {
    responseHandler.error(res);
  }
};

const search = async (req, res) => {
  try {
    let plasform = {};
    let type = req.query.type;
    const page = req.query.page;
    let title = slugify(req.query.query);

    if (type === "platforms") {
      const plasforms = await rawgApi.platforms();
      plasform = plasforms.results.find((e) => e.slug === title);
      if (plasform) {
        title = plasform.id;
      } else {
        title = null;
      }
    }
    if (type == "name") {
      type = "search";
    }
    const response = await rawgApi.gameSearch({ [type]: title, page: page });
    const result = {
      count: response.count,
      data: [],
    };
    response.results.forEach((e) => {
      result.data.push({
        id: e.id,
        title: e.name,
        img: e.background_image,
        platforms: e.parent_platforms,
      });
    });
    responseHandler.ok(res, result);
  } catch {
    responseHandler.error(res);
  }
};

const searchByName = async (req, res) => {
  try {
    let type = "search";
    const page = req.query.page;
    let title = slugify(req.query.query);
    const response = await rawgApi.gameSearch({ [type]: title, page: page });
    const result = {
      count: response.count,
      data: [],
    };
    response.results.forEach((e) => {
      result.data.push({
        id: e.id,
        title: e.name,
        img: e.background_image,
        platforms: e.parent_platforms,
      });
    });
    responseHandler.ok(res, result);
  } catch {
    responseHandler.error(res);
  }
};

const searchByPlatform = async (req, res) => {
  try {
    let plasform = {};
    let type = "platforms";
    const page = req.query.page;
    let title = slugify(req.query.query);
    const plasforms = await rawgApi.platforms();
    plasform = plasforms.results.find((e) => e.slug === title);
    if (plasform) {
      title = plasform.id;
    } else {
      title = null;
    }
    const response = await rawgApi.gameSearch({ [type]: title, page: page });
    const result = {
      count: response.count,
      data: [],
    };
    response.results.forEach((e) => {
      result.data.push({
        id: e.id,
        title: e.name,
        img: e.background_image,
        platforms: e.parent_platforms,
      });
    });
    responseHandler.ok(res, result);
  } catch {
    responseHandler.error(res);
  }
};

const searchByPublisher = async (req, res) => {
  try {
    let type = "publishers";
    const page = req.query.page;
    let title = slugify(req.query.query);
    const response = await rawgApi.gameSearch({ [type]: title, page: page });
    const result = {
      count: response.count,
      data: [],
    };
    response.results.forEach((e) => {
      result.data.push({
        id: e.id,
        title: e.name,
        img: e.background_image,
        platforms: e.parent_platforms,
      });
    });
    responseHandler.ok(res, result);
  } catch {
    responseHandler.error(res);
  }
};

const searchByDeveloper = async (req, res) => {
  try {
    let type = "developers";
    const page = req.query.page;
    let title = slugify(req.query.query);
    const response = await rawgApi.gameSearch({ [type]: title, page: page });
    const result = {
      count: response.count,
      data: [],
    };
    response.results.forEach((e) => {
      result.data.push({
        id: e.id,
        title: e.name,
        img: e.background_image,
        platforms: e.parent_platforms,
      });
    });
    responseHandler.ok(res, result);
  } catch {
    responseHandler.error(res);
  }
};

const searchByGenre = async (req, res) => {
  try {
    let type = "genres";
    const page = req.query.page;
    let title = slugify(req.query.query);
    const response = await rawgApi.gameSearch({ [type]: title, page: page });
    const result = {
      count: response.count,
      data: [],
    };
    response.results.forEach((e) => {
      result.data.push({
        id: e.id,
        title: e.name,
        img: e.background_image,
        platforms: e.parent_platforms,
      });
    });
    responseHandler.ok(res, result);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const id = req.query;

    const response = await rawgApi.gameDetail(id.id);
    const reviews = await reviewModel.find({ id: id.id });
    let overal_review = await overalReviewModel.findOne({ id: id.id });
    let newOveral = { ...overal_review };
    if (overal_review == null) {
      newOveral = {
        _doc: {
          overal: "There is no review about this game",
          con_words: [],
          pos_words: [],
        },
      };
    }

    const screenshotAPIs = await rawgApi.gameScreenshots(id.id);

    const screenshots = screenshotAPIs.results.reduce(
      (accum, obj) => [...accum, obj.image],
      []
    );
    const genres = await response.genres.reduce(
      (accum, obj) => [...accum, obj.name],
      []
    );
    const publishers = await response.publishers.reduce(
      (accum, obj) => [...accum, obj.name],
      []
    );
    const developers = await response.developers.reduce(
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
      released: response.released,
      publishers: String(publishers),
      developers: String(developers),
      detail: response.description,
      background_image: response.background_image_additional,
      screenshots: screenshots,
      reviews: reviews,
      overal_review: {
        overal: newOveral["_doc"].overal,
        pos: newOveral["_doc"].pos_words,
        neg: newOveral["_doc"].con_words,
      },
    };
    console.log(data);
    responseHandler.ok(res, data);
  } catch (e) {
    responseHandler.error(res);
  }
};

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
export default {
  getList,
  search,
  getDetail,
  getListByContent,
};
