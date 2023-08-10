import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const mediaEndpoints = {
  //
  list: (page) => `games?page=${page}`,
  listByContent: (type) => `games/${type}`,
  detail: ({ mediaId }) => `games/detail?id=${mediaId}`,
  analysis: ({ mediaType, mediaId }) =>
    `${mediaType}/detailEvaluate/${mediaId}`,
  search: ({ type, query, page }) =>
    `games/search?query=${query}&type=${type}&page=${page}`,
};

const mediaApi = {
  getList: async (page) => {
    try {
      // const response = await publicClient.get(mediaEndpoints.list);
      const response = await publicClient.get(mediaEndpoints.list(page));

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getListByContent: async (type) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.listByContent(type)
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await privateClient.get(
        mediaEndpoints.detail({ mediaType, mediaId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getAnalysis: async ({ mediaType, mediaId }) => {
    try {
      const response = await privateClient.get(
        mediaEndpoints.analysis({ mediaType, mediaId })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  search: async ({ type, query, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.search({ type, query, page })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default mediaApi;
