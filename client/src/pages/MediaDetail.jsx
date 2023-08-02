import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import CircularRate from "../components/common/CircularRate";
import Container from "../components/common/Container";
import ImageHeader from "../components/common/ImageHeader";

import uiConfigs from "../configs/ui.configs";

import mediaApi from "../api/modules/media.api";

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";

import MediaReview from "../components/common/MediaReview";
import styled from "@emotion/styled";
import BackdropSlide from "../components/common/BackdropSlide";
import ScreenShotsSlide from "../components/common/ScreenShotsSlide";
const ReadButton = styled.span`
  background-color: red;
  font-size: 16px;
  text-align: center;
  border-radius: 2px;
  padding: 5px 5px;
  color: white;
  cursor: pointer;
`;

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();
  const { overal, setOveral } = useState();
  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const dispatch = useDispatch();

  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
        setIsFavorite(response.isFavorite);
        setGenres(response.genres);
        setOveral(response.overal_review.overal.split("/n"));
      }

      if (err) toast.error(err.message);
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);

  return media ? (
    <>
      <ImageHeader imgPath={media.background_image} />
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        {/* media content */}
        <Box
          sx={{
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            {/* poster */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(media.img),
                }}
              />
            </Box>
            {/* poster */}

            {/* media info */}
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary",
              }}
            >
              <Stack spacing={5}>
                {/* title */}
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                  fontWeight="700"
                  sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                >
                  {media.title}
                </Typography>
                {/* title */}
                {/* plasform */}

                <Stack
                  sx={{
                    marginTop: { xs: "1rem", md: "1rem", lg: "1rem" },
                  }}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  flexWrap="wrap"
                  gap="8px"
                >
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "1rem", md: "1.5rem", lg: "1.5rem" }}
                    fontWeight="700"
                    sx={{
                      ...uiConfigs.style.typoLines(2, "left"),
                      width: "100%",
                    }}
                  >
                    {`Platforms :`}
                  </Typography>
                  {/* rate */}
                  {/* <CircularRate value={media.vote_average} /> */}
                  {/* rate */}
                  <Divider orientation="vertical" />

                  {media.plasform.map((plasform, index) => (
                    <Chip
                      label={plasform}
                      variant="filled"
                      color="primary"
                      key={index}
                    />
                  ))}
                  {/* genres */}
                </Stack>
                {/* plasform */}
                {/* rate and genres */}

                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  flexWrap="wrap"
                  gap="8px"
                >
                  {/* rate */}
                  {/* <CircularRate value={media.vote_average} /> */}
                  {/* rate */}
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "1rem", md: "1.5rem", lg: "1.5rem" }}
                    fontWeight="700"
                    sx={{
                      ...uiConfigs.style.typoLines(2, "left"),
                      width: "100%",
                    }}
                  >
                    {`Genres :`}
                  </Typography>
                  <Divider orientation="vertical" />
                  {/* genres */}

                  {genres.map((genre, index) => (
                    <Chip
                      label={genre}
                      variant="filled"
                      color="primary"
                      key={index}
                    />
                  ))}
                  {/* genres */}
                </Stack>
                {/* rate and genres */}
                <Box sx={{ minWidth: 275 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography color="text.secondary" gutterBottom>
                        Released: {media.released}
                      </Typography>
                      <Typography color="text.secondary" gutterBottom>
                        Developers: {media.developers}
                      </Typography>
                      <Typography color="text.secondary" gutterBottom>
                        Publisher: {media.publishers}
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        flexWrap="wrap"
                        gap="16px"
                      >
                        {isReadMore ? (
                          <Typography
                            variant="body1"
                            sx={{ ...uiConfigs.style.typoLines("5") }}
                            dangerouslySetInnerHTML={{ __html: media.detail }}
                          ></Typography>
                        ) : (
                          <Typography
                            variant="body1"
                            sx={{ ...uiConfigs.style.typoLines("none") }}
                            dangerouslySetInnerHTML={{ __html: media.detail }}
                          ></Typography>
                        )}

                        <ReadButton onClick={toggleReadMore}>
                          {isReadMore ? "Read more" : " Show less"}
                        </ReadButton>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
                {/* overview */}

                {/* overview */}

                {/* buttons */}
                {/* <Stack direction="row" spacing={1}>
                  <LoadingButton
                    variant="text"
                    sx={{
                      width: "max-content",
                      "& .MuiButon-starIcon": { marginRight: "0" },
                    }}
                    size="large"
                    startIcon={
                      isFavorite ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    loadingPosition="start"
                    loading={onRequest}
                    // onClick={onFavoriteClick}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: "max-content" }}
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => videoRef.current.scrollIntoView()}
                  >
                    watch now
                  </Button>
                </Stack> */}
                {/* buttons */}

                {/* cast */}
                {/* <Container header="Screenshots">
                  <ScreenShotsSlide screenshots={media.screenshots} />
                </Container> */}
                {/* cast */}
              </Stack>
            </Box>
            {/* media info */}
          </Box>
        </Box>
        {/* media content */}

        {/* media videos */}
        {/* <div ref={videoRef} style={{ paddingTop: "2rem" }}>
          <Container header="Videos">
            <MediaVideosSlide videos={[...media.videos.results].splice(0, 5)} />
          </Container>
        </div> */}
        {/* media videos */}

        {/* media backdrop */}
        {media.screenshots.length > 0 && (
          <Container header="backdrops">
            <BackdropSlide backdrops={media.screenshots} />
          </Container>
        )}
        {/* media backdrop */}

        {/* media posters */}
        {/* {media.images.posters.length > 0 && (
          <Container header="posters">
            <PosterSlide posters={media.images.posters} />
          </Container>
        )} */}
        {/* media posters */}

        {/* media reviews */}
        <Container header="Overal review">
          <Typography variant="body1">
            {media.overal_review.overal.split("/n").map((paragraph, index) => (
              <p key={index}>
                {paragraph.split(" ").map((word, index) => {
                  if (media.overal_review.pos.includes(word)) {
                    return <span style={{ color: "#26B966" }}>{word} </span>;
                  } else if (media.overal_review.neg.includes(word)) {
                    return <span style={{ color: "#FF6868" }}>{word} </span>;
                  } else return <span> {word} </span>;
                })}
              </p>
            ))}
          </Typography>
        </Container>
        <MediaReview
          reviews={media.reviews}
          media={media}
          mediaType={mediaType}
        />
        {/* media reviews */}

        {/* media recommendation */}
        {/* <Container header="you may also like">
          {media.recommend.length > 0 && (
            <RecommendSlide medias={media.recommend} mediaType={mediaType} />
          )}
          {media.recommend.length === 0 && (
            <MediaSlide
              mediaType={mediaType}
              mediaCategory={tmdbConfigs.mediaCategory.top_rated}
            />
          )}
        </Container> */}
        {/* media recommendation */}
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
