import rawgConfig from "./rawg.config.js";

const rawgEndpoints = {
  gameList: ({ page }) => rawgConfig.getUrl(`games`, { page }),
  gameListByContent: (type) => rawgConfig.getUrl(`games`, type),
  gameDetail: (id) => rawgConfig.getUrl(`games/${id}`),
  gameScreenshots: (id) => rawgConfig.getUrl(`games/${id}/screenshots`),
  platforms: () => rawgConfig.getUrl(`platforms`),
  gameSearch: (query) => rawgConfig.getUrl(`games`, query),

  // mediaGenres: ({ mediaType }) => tmdbConfig.getUrl(`genre/${mediaType}/list`),
  // mediaCredits: ({ mediaType, mediaId }) =>
  //   tmdbConfig.getUrl(`${mediaType}/${mediaId}/credits`),
  // mediaVideos: ({ mediaType, mediaId }) =>
  //   tmdbConfig.getUrl(`${mediaType}/${mediaId}/videos`),
  // mediaRecommend: ({ mediaType, mediaId }) =>
  //   tmdbConfig.getUrl(`${mediaType}/${mediaId}/recommendations`),
  // mediaImages: ({ mediaType, mediaId }) =>
  //   tmdbConfig.getUrl(`${mediaType}/${mediaId}/images`),

  // personDetail: ({ personId }) => tmdbConfig.getUrl(`person/${personId}`),
  // personMedias: ({ personId }) =>
  //   tmdbConfig.getUrl(`person/${personId}/combined_credits`),
};

export default rawgEndpoints;
