import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularRate from "./CircularRate";
import { useSelector } from "react-redux";
import favoriteUtils from "../../utils/favorite.utils";
import {
  FaWindows,
  FaLinux,
  FaXbox,
  FaPlaystation,
  FaApple,
  FaAndroid,
} from "react-icons/fa";
import { RiAppleFill } from "react-icons/ri";
import { SiIos, SiNintendoswitch } from "react-icons/si";

const platformsImage = [
  {
    name: "pc",
    img: <FaWindows />,
  },
  {
    name: "linux",
    img: <FaLinux />,
  },
  {
    name: "xbox",
    img: <FaXbox />,
  },
  {
    name: "playstation",
    img: <FaPlaystation />,
  },
  {
    name: "ios",
    img: <SiIos />,
  },
  {
    name: "android",
    img: <FaAndroid />,
  },
  {
    name: "mac",
    img: <RiAppleFill />,
  },
  {
    name: " nintendo",
    img: <SiNintendoswitch />,
  },
];
const MediaItem = ({ media, mediaType }) => {
  const { listFavorites } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);

    setRate(media.vote_average || media.mediaRate);
    const images = platformsImage.filter((item) =>
      media.platforms.some((e) => item.name === e.platform.slug)
    );

    setPlatforms(images);
  }, [media, mediaType]);

  return (
    <Link
      to={
        mediaType !== "people"
          ? routesGen.mediaDetail(mediaType, media.mediaId || media.id)
          : routesGen.person(media.id)
      }
    >
      <Box
        sx={{
          ...uiConfigs.style.backgroundImage(media.img),
          paddingTop: "160%",
          " .media-info": { opacity: 1, bottom: 0 },
          " .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
          color: "primary.contrastText",
        }}
      >
        {/* movie or tv item */}
        {mediaType !== "people" && (
          <>
            {favoriteUtils.check({ listFavorites, mediaId: media.id }) && (
              <FavoriteIcon
                color="primary"
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  fontSize: "2rem",
                }}
              />
            )}
            <Box
              className="media-back-drop"
              sx={{
                opacity: { xs: 1, md: 0 },
                transition: "all 0.3s ease",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundImage:
                  "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
              }}
            />
            <Button
              className="media-play-btn"
              variant="contained"
              startIcon={<RemoveRedEyeIcon />}
              sx={{
                display: { xs: "none", md: "flex" },
                opacity: 0,
                transition: "all 0.3s ease",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                "& .MuiButton-startIcon": { marginRight: "-4px" },
              }}
            />
            <Box
              className="media-info"
              sx={{
                transition: "all 0.3s ease",
                opacity: { xs: 1, md: 0 },
                position: "absolute",
                bottom: { xs: 0, md: "-20px" },
                width: "100%",
                height: "max-content",
                boxSizing: "border-box",
                padding: { xs: "10px", md: "2rem 1rem" },
              }}
            >
              <Stack spacing={{ xs: 1, md: 2 }}>
                {/* {rate && <CircularRate value={rate} />} */}

                {/* <Typography>{releaseDate}</Typography> */}
                <Typography
                  variant="body1"
                  fontWeight="700"
                  sx={{
                    fontSize: "1rem",
                    ...uiConfigs.style.typoLines(1, "left"),
                  }}
                >
                  {title}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="baseline"
                  spacing={2}
                >
                  {platforms.map((e) => {
                    return e.img;
                  })}
                </Stack>
              </Stack>
            </Box>
          </>
        )}
        {/* movie or tv item */}

        {/* people */}
        {mediaType === "people" && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "max-content",
              bottom: 0,
              padding: "10px",
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          >
            <Typography sx={{ ...uiConfigs.style.typoLines(1, "left") }}>
              {media.name}
            </Typography>
          </Box>
        )}
        {/* people */}
      </Box>
    </Link>
  );
};

export default MediaItem;
