import { Box, Divider, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import reviewApi from "../api/modules/review.api";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { routesGen } from "../routes/routes";

const ReviewItem = ({ review }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        padding: 1,
        opacity: 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Box sx={{ width: { xs: 0, md: "10%" } }}>
        <Link
          to={routesGen.mediaDetail(review.mediaType, review.mediaid)}
          style={{ color: "unset", textDecoration: "none" }}
        >
          <Box
            sx={{
              paddingTop: "160%",
            }}
          />
        </Link>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          padding: { xs: 0, md: "0 2rem" },
        }}
      >
        <Stack spacing={1}>
          <Link
            to={routesGen.mediaDetail(review.mediaType, review.mediaid)}
            style={{ color: "unset", textDecoration: "none" }}
          >
            <Typography
              variant="h6"
              sx={{ ...uiConfigs.style.typoLines(1, "left") }}
            >
              {review.mediaTitle}
            </Typography>
          </Link>
          <Typography variant="caption">
            {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
          </Typography>
          <Typography>{review.content}</Typography>
        </Stack>
      </Box>

      {/* <LoadingButton
        variant="contained"
        sx={{
          position: { xs: "relative", md: "absolute" },
          right: { xs: 0, md: "10px" },
          marginTop: { xs: 2, md: 0 },
          width: "max-content",
        }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={onRequest}
        onClick={onRemove}
      >
        remove
      </LoadingButton> */}
    </Box>
  );
};

const ReviewList = () => {
  const [filteredReviews, setFilteredReviews] = useState([]);

  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const skip = 2;

  useEffect(() => {
    const getReviews = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await reviewApi.getList();
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        setCount(response.length);

        setFilteredReviews([...response].splice(0, skip));
      }
    };

    getReviews();
  }, [dispatch]);

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your reviews (${count})`}>
        <Stack spacing={2}>
          {filteredReviews.map((item) => (
            <Box key={item.id}>
              <ReviewItem review={item} />
              <Divider
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              />
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default ReviewList;
