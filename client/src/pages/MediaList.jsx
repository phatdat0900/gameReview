import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import mediaApi from "../api/modules/media.api";
import uiConfigs from "../configs/ui.configs";

import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";

import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";

const MediaList = () => {
  const [listShow, setListShow] = useState([]);
  const [psGame, setPsGame] = useState([]);
  const [mobileGame, setMobileGame] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [topGameLoading, setTopGameLoading] = useState(true);
  const [ps5GameLoading, setPs5GameLoading] = useState(true);
  const [mobileGameLoading, setMobileGameLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAppState("game"));
    window.scrollTo(0, 0);
  }, [dispatch]);

  useEffect(() => {
    const getMedias = async () => {
      setTopGameLoading(true);
      try {
        const { response } = await mediaApi.getList(1);
        setListShow(response);
      } catch (err) {
        toast.error(err.message);
        setListShow([]);
      } finally {
        setTopGameLoading(false);
      }
    };
    getMedias();
  }, []);

  useEffect(() => {
    const getMedias = async () => {
      setPs5GameLoading(true);
      try {
        const { response } = await mediaApi.getListByContent(2);
        setPsGame(response);
      } catch (err) {
        toast.error(err.message);
        setPsGame([]);
      } finally {
        setPs5GameLoading(false);
      }
    };
    getMedias();
  }, []);
  useEffect(() => {
    const getMedias = async () => {
      setMobileGameLoading(true);
      try {
        const { response } = await mediaApi.getListByContent(4, 8);
        setMobileGame(response);
      } catch (err) {
        toast.error(err.message);
        setMobileGame([]);
      } finally {
        setMobileGameLoading(false);
      }
    };
    getMedias();
  }, []);

  useEffect(() => {
    dispatch(setGlobalLoading(true));
    if (
      topGameLoading == false ||
      ps5GameLoading == false ||
      mobileGameLoading == false
    )
      dispatch(setGlobalLoading(false));
  }, [dispatch, topGameLoading, ps5GameLoading, mobileGameLoading]);

  return (
    <>
      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container
          header="Best of All time"
          sx={{ ...uiConfigs.style.mainContent }}
        >
          <MediaSlide medias={listShow} mediaType={"game"} />
        </Container>
        <Container
          header="Play Station"
          sx={{ ...uiConfigs.style.mainContent }}
        >
          <MediaSlide medias={psGame} mediaType={"game"} />
        </Container>
        <Container header="Mobile" sx={{ ...uiConfigs.style.mainContent }}>
          <MediaSlide medias={mobileGame} mediaType={"game"} />
        </Container>
      </Box>
    </>
  );
};

export default MediaList;
