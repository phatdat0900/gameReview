import axiosClient from "../axios/axios.client.js";
import rawgEndpoints from "./rawg.endpoints.js";

const rawgApi = {
  gameList: async ({ page }) =>
    await axiosClient.get(rawgEndpoints.gameList({ page })),
  gameListByConent: async (type) =>
    await axiosClient.get(rawgEndpoints.gameListByContent(type)),
  gameDetail: async (id) => await axiosClient.get(rawgEndpoints.gameDetail(id)),
  gameScreenshots: async (id) =>
    await axiosClient.get(rawgEndpoints.gameScreenshots(id)),
  // mediaGenres: async ({ mediaType }) =>
  //   await axiosClient.get(tmdbEndpoints.mediaGenres({ mediaType })),
  platforms: async () => await axiosClient.get(rawgEndpoints.platforms()),
  gameSearch: async (query) =>
    await axiosClient.get(rawgEndpoints.gameSearch(query)),
  mediaCredits: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaCredits({ mediaType, mediaId })),
  mediaVideos: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaVideos({ mediaType, mediaId })),
  mediaImages: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaImages({ mediaType, mediaId })),
  mediaRecommend: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaRecommend({ mediaType, mediaId })),
  mediaSearch: async ({ mediaType, query, page }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaSearch({ mediaType, query, page })
    ),
  personDetail: async ({ personId }) =>
    await axiosClient.get(tmdbEndpoints.personDetail({ personId })),
  personMedias: async ({ personId }) =>
    await axiosClient.get(tmdbEndpoints.personMedias({ personId })),
};

export default rawgApi;
