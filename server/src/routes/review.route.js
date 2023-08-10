import express from "express";
import { body } from "express-validator";
import reviewController from "../controllers/review.controller.js";
// import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router({ mergeParams: true });
router.get("/", reviewController.getReviewByID);
router.get("/overal", reviewController.getOveralReviewByID);
export default router;
