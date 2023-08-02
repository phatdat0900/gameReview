import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import mediaApi from "../api/modules/media.api";
import uiConfigs from "../configs/ui.configs";

import MediaGrid from "../components/common/MediaGrid";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";
import usePrevious from "../hooks/usePrevious";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";

const MediaList = () => {
  const { mediaType } = useParams();

  const [medias, setMedias] = useState([]);
  const [listShow, setListShow] = useState([]);
  const [psGame, setPsGame] = useState([]);
  const [mobileGame, setMobileGame] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const prevMediaType = usePrevious(mediaType);
  const dispatch = useDispatch();

  const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
  const category = ["popular", "top rated"];

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
  }, [mediaType, dispatch]);

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);
      const { response, err } = await mediaApi.getList(1);
      setListShow(response);
      setMediaLoading(false);
      dispatch(setGlobalLoading(false));
      if (err) toast.error(err.message);
    };
    if (mediaType !== prevMediaType) {
      setCurrCategory(0);
      setCurrPage(1);
    }
    getMedias();
  }, [mediaType, currCategory, prevMediaType, mediaCategories, dispatch]);
  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));

      const { response, err } = await mediaApi.getListByContent(2);

      setPsGame(response);
      setMediaLoading(false);
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
    };
    getMedias();
  }, [mediaType, currCategory, prevMediaType, mediaCategories, dispatch]);
  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));

      const { response, err } = await mediaApi.getListByContent(4, 8);

      setMobileGame(response);
      setMediaLoading(false);
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
    };
    getMedias();
  }, [mediaType, currCategory, prevMediaType, mediaCategories, dispatch]);

  useEffect(() => {
    setListShow(medias.slice(0, currPage * 8));
  }, [currPage]);
  // const onCategoryChange = (categoryIndex) => {
  //   if (currCategory === categoryIndex) return;
  //   setMedias([]);
  //   setCurrPage(1);
  //   setCurrCategory(categoryIndex);
  // };
  // const listShow = useMemo(() => {
  //   return medias.slice(0, 4 * currPage);
  // }, [currPage]);

  const onLoadMore = () => setCurrPage(currPage + 1);

  return (
    <>
      {/* <Container header="new games">
        <MediaSlide
          mediaType={mediaType}
          mediaCategory={tmdbConfigs.mediaCategory.popular}
        />
      </Container> */}
      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container
          header="Best of All time"
          sx={{ ...uiConfigs.style.mainContent }}
        >
          <MediaSlide medias={listShow} mediaType={mediaType} />
        </Container>
        <Container
          header="Play Station"
          sx={{ ...uiConfigs.style.mainContent }}
        >
          <MediaSlide medias={psGame} mediaType={mediaType} />
        </Container>
        <Container header="Mobile" sx={{ ...uiConfigs.style.mainContent }}>
          <MediaSlide medias={mobileGame} mediaType={mediaType} />
        </Container>
      </Box>
    </>
  );
};

export default MediaList;
