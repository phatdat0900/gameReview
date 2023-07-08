import rawgConfig from "./rawg.config.js";

const rawgEndpoints = {
  gameList: ({ page }) => rawgConfig.getUrl(`games`, { page }),
  gameDetail: (id) => rawgConfig.getUrl(`games/${id}`),
  gameScreenshots: (id) => rawgConfig.getUrl(`games/${id}/screenshots`),
  // mediaGenres: ({ mediaType }) => tmdbConfig.getUrl(`genre/${mediaType}/list`),
  // mediaCredits: ({ mediaType, mediaId }) =>
  //   tmdbConfig.getUrl(`${mediaType}/${mediaId}/credits`),
  // mediaVideos: ({ mediaType, mediaId }) =>
  //   tmdbConfig.getUrl(`${mediaType}/${mediaId}/videos`),
  // mediaRecommend: ({ mediaType, mediaId }) =>
  //   tmdbConfig.getUrl(`${mediaType}/${mediaId}/recommendations`),
  // mediaImages: ({ mediaType, mediaId }) =>
  //   tmdbConfig.getUrl(`${mediaType}/${mediaId}/images`),
  // mediaSearch: ({ mediaType, query, page }) =>
  //   tmdbConfig.getUrl(`search/${mediaType}`, { query, page }),
  // personDetail: ({ personId }) => tmdbConfig.getUrl(`person/${personId}`),
  // personMedias: ({ personId }) =>
  //   tmdbConfig.getUrl(`person/${personId}/combined_credits`),
};

export default rawgEndpoints;
