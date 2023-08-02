import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import Container from "./Container";
import reviewApi from "../../api/modules/review.api";
import TextAvatar from "./TextAvatar";
import mediaApi from "../../api/modules/media.api";
import { color } from "@mui/system";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import uiConfigs from "../../configs/ui.configs";
// const data = {
//   id: 1,
//   name: "IGN",
//   link: "url",
//   category: {
//     story: {
//       review: "",
//       score: 10,
//     },
//     graphic: {
//       review: "",
//       score: 10,
//     },
//     gameplay: {
//       review: "",
//       score: -10,
//     },
//     sound: {
//       review: "",
//       score: 10,
//     },
//   },
//   overal_review:
//     "GTA Online proporcionará muchos desafíos adicionales incluso para los jugadores experimentados, recién llegados del modo historia. Ahora tendrás otros jugadores cerca que pueden ayudarte con la misma probabilidad que arruinar tu misión. Los jugadores pueden experimentar todas las mecánicas de GTA actualizadas a través del personaje personalizable único, y el contenido de la comunidad combinado con el sistema de nivelación tiende a mantener a todos ocupados y comprometidos.",
// };

const ReviewItem = ({ review }) => {
  const { user } = useSelector((state) => state.user);

  const [onRequest, setOnRequest] = useState(false);
  const [positive, setPositive] = useState([]);
  const [negative, setNegative] = useState([]);
  const [score, setScore] = useState(0);
  const [statementArray, setStatementArray] = useState([]);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const getStatus = (score) => {
    if (score > 0) {
      return (
        <div
          style={{
            fontSize: "1rem",
            fontWeight: "400",
            width: "100px",
            textAlign: "center",
            padding: "3px 10px",
            color: "#26B966",
            backgroundColor: "#E4F8ED",
            borderRadius: "3px",
          }}
        >
          POSITIVE
        </div>
      );
    } else if (score < -6) {
      return (
        <div
          style={{
            fontSize: "1rem",
            fontWeight: "400",
            width: "100px",
            textAlign: "center",
            padding: "3px 10px",
            color: "#FF6868",
            backgroundColor: "#FEEDEC",
            borderRadius: "3px",
          }}
        >
          NEGATIVE
        </div>
      );
    } else {
      return (
        <div
          style={{
            fontSize: "1rem",
            fontWeight: "400",
            width: "100px",
            textAlign: "center",
            padding: "3px 10px",
            color: "#FFB82C",
            backgroundColor: "#FFF8E0",
            borderRadius: "3px",
          }}
        >
          NEUTRAL
        </div>
      );
    }
  };
  useEffect(() => {
    // let statement = review.comment.split(" ");
    // setStatementArray(statement);
    // setPositive(review.score.positive);
    // setNegative(review.score.negative);
    // setScore(review.score.score);
  }, [review]);

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: "5px",
        position: "relative",
        opacity: onRequest ? 0.6 : 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          gap: { md: "20px", xs: "20px" },
        }}
        spacing={1}
      >
        {/* avatar */}
        <Stack
          spacing={1}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: 1 / 4, minWidth: "279px" }}
        >
          <Avatar
            sx={{
              backgroundColor: "red",
              width: 100,
              height: 100,
              color: "white",
              fontSize: "50px",
              fontWeight: 700,
            }}
            children={review.score}
          />
          <Grid
            fontSize={{ xs: "1rem" }}
            fontWeight="700"
            container
            spacing={2}
          >
            {Object.entries(review.category).map((item) => (
              <Grid container item xs={6} direction="column">
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  flexWrap="wrap"
                >
                  <Typography variant="h6" fontWeight="700">
                    {`${capitalizeFirstLetter(item[0])} :`}
                  </Typography>

                  {getStatus(item[1].score)}
                </Stack>
              </Grid>
            ))}
          </Grid>
          {/* <Divider orientation="vertical" /> */}
        </Stack>

        {/* avatar */}
        <Card variant="outlined" sx={{ width: "100%" }}>
          <CardContent>
            <Stack spacing={2} flexGrow={1} justifyContent="start">
              <Stack spacing={1} direction="row">
                <TextAvatar text={review.name} />
                <Typography variant="h6" fontWeight="700">
                  {review.name}
                </Typography>
              </Stack>
              <Typography variant="body1" textAlign="justify">
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                  }}
                ></div>
                <p> {review.overal}</p>

                <p>
                  <a
                    href={review.link}
                    style={{
                      color: "#2c82f2",
                    }}
                  >
                    Read full review
                  </a>
                </p>
              </Typography>
              {/* {user && user.id === review.user.id && (
            <LoadingButton
              variant="contained"
              startIcon={<DeleteIcon />}
              loadingPosition="start"
              loading={onRequest}
              onClick={onRemove}
              sx={{
                position: { xs: "relative", md: "absolute" },
                right: { xs: 0, md: "10px" },
                marginTop: { xs: 2, md: 0 },
                width: "max-content",
              }}
            >
              remove
            </LoadingButton>
          )} */}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

const MediaReview = ({ reviews, media, mediaType }) => {
  const { user } = useSelector((state) => state.user);
  const [analysis, setAnalysis] = useState();
  const [listReviews, setListReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [onRequest, setOnRequest] = useState(false);
  const [content, setContent] = useState("");
  const [reviewCount, setReviewCount] = useState(0);
  const { mediaId } = useParams();
  const dispatch = useDispatch();
  const [topics, setTopics] = useState({});
  const skip = 6;

  useEffect(() => {
    // const getAnalysis = async () => {
    //   dispatch(setGlobalLoading(true));
    //   const { response, err } = await mediaApi.getAnalysis({
    //     mediaType,
    //     mediaId,
    //   });
    //   dispatch(setGlobalLoading(false));
    //   if (response) {
    //     setAnalysis(response.review);
    //     setTopics({
    //       graphic: response.graphic,
    //       story: response.story,
    //       gameplay: response.gameplay,
    //     });
    //   }

    //   if (err) toast.error(err.message);
    // };
    // getAnalysis();
    // console.log(reviews);
    setListReviews([...reviews]);
    setFilteredReviews([...reviews].splice(0, skip));
    setReviewCount(reviews.length);
  }, [reviews, analysis]);

  // const onRemoved = (id) => {
  //   if (listReviews.findIndex((e) => e.id === id) !== -1) {
  //     const newListReviews = [...listReviews].filter((e) => e.id !== id);
  //     setListReviews(newListReviews);
  //     setFilteredReviews([...newListReviews].splice(0, page * skip));
  //   } else {
  //     setFilteredReviews([...filteredReviews].filter((e) => e.id !== id));
  //   }

  //   setReviewCount(reviewCount - 1);

  //   toast.success("Remove review success");
  // };

  return (
    <>
      {/* <Container header={`Overall Review `}>
        <Box
          sx={{
            padding: 2,
            borderRadius: "5px",
            position: "relative",
            opacity: onRequest ? 0.6 : 1,
            "&:hover": { backgroundColor: "background.paper" },
          }}
        >
          {`${analysis}`}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {Object.entries(topics).map((item) => {
            return (
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: " transparent",
                  borderRadius: "50%",
                  border: "10px solid red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item[0]}
              </div>
            );
          })}
        </Box>
      </Container> */}
      <Container header={`Reviews (${reviewCount})`}>
        <Stack spacing={4} marginBottom={2}>
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
          {/* {filteredReviews.length < listReviews.length && (
            <Button onClick={onLoadMore}>load more</Button>
          )} */}
        </Stack>
        {/* {user && (
          <>
            <Divider />
            <Stack direction="row" spacing={2}>
              <TextAvatar text={user.displayName} />
              <Stack spacing={2} flexGrow={1}>
                <Typography variant="h6" fontWeight="700">
                  {user.displayName}
                </Typography>
                <TextField
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  multiline
                  rows={4}
                  placeholder="Write your review"
                  variant="outlined"
                />
                <LoadingButton
                  variant="contained"
                  size="large"
                  sx={{ width: "max-content" }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition="start"
                  loading={onRequest}
                  onClick={onAddReview}
                >
                  post
                </LoadingButton>
              </Stack>
            </Stack>
          </>
        )} */}
      </Container>
    </>
  );
};

export default MediaReview;
