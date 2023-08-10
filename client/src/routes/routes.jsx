import MediaDetail from "../pages/MediaDetail";
import MediaList from "../pages/MediaList";
import MediaSearch from "../pages/MediaSearch";
import ReviewList from "../pages/ReviewList";

export const routesGen = {
  home: "/",
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: "/search",
};

const routes = [
  {
    index: true,
    element: <MediaList />,
    state: "home",
  },

  {
    path: "/search",
    element: <MediaSearch />,
    state: "search",
  },

  {
    path: "/reviews",
    element: <ReviewList />,
    state: "reviews",
  },
  {
    path: "/:mediaType",
    element: <MediaList />,
  },
  {
    path: "/:mediaType/:mediaId",
    element: <MediaDetail />,
  },
];

export default routes;
