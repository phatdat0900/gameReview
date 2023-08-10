import express from "express";
import mediaRoute from "./media.route.js";
import reviewRoute from "./review.route.js";

const router = express.Router();

router.use("/reviews", reviewRoute);
router.use("/games", mediaRoute);

export default router;
