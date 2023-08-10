import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Container from "../components/common/Container";
import ImageHeader from "../components/common/ImageHeader";

import uiConfigs from "../configs/ui.configs";

import mediaApi from "../api/modules/media.api";

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";

import MediaReview from "../components/common/MediaReview";
import styled from "@emotion/styled";
import BackdropSlide from "../components/common/BackdropSlide";

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

  const [media, setMedia] = useState();

  const [genres, setGenres] = useState([]);

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const dispatch = useDispatch();

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
        setGenres(response.genres);
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

                  <Divider orientation="vertical" />

                  {media.plasform.map((plasform, index) => (
                    <Chip
                      label={plasform}
                      variant="filled"
                      color="primary"
                      key={index}
                    />
                  ))}
                </Stack>

                <Stack
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
              </Stack>
            </Box>
          </Box>
        </Box>

        {media.screenshots.length > 0 && (
          <Container header="backdrops">
            <BackdropSlide backdrops={media.screenshots} />
          </Container>
        )}

        <Container header="Overal review">
          <Typography variant="body1">
            {media.overal_review.overal
              .split("<br>")
              .map((paragraph, index) => {
                return (
                  <p key={index}>
                    {paragraph.split(" ").map((word, key) => {
                      if (media.overal_review.pos.includes(word)) {
                        return (
                          <span key={key} style={{ color: "#26B966" }}>
                            {word}
                          </span>
                        );
                      } else if (media.overal_review.neg.includes(word)) {
                        return (
                          <span key={key} style={{ color: "#FF6868" }}>
                            {word}
                          </span>
                        );
                      } else return <span> {word} </span>;
                    })}
                  </p>
                );
              })}
          </Typography>
        </Container>
        <MediaReview
          reviews={media.reviews}
          media={media}
          mediaType={mediaType}
        />
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
