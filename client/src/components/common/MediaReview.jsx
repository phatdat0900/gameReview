import { Avatar, Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { useDispatch, useSelector } from "react-redux";
import Container from "./Container";

import TextAvatar from "./TextAvatar";

const ReviewItem = ({ review }) => {
  const [onRequest, setOnRequest] = useState(false);
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
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

const MediaReview = ({ reviews }) => {
  const [analysis] = useState();

  const [filteredReviews, setFilteredReviews] = useState([]);

  const [reviewCount, setReviewCount] = useState(0);

  const skip = 6;

  useEffect(() => {
    setFilteredReviews([...reviews].splice(0, skip));
    setReviewCount(reviews.length);
  }, [reviews, analysis]);

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
      </Container>
    </>
  );
};

export default MediaReview;
