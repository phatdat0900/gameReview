import express from "express";
import mediaController from "../controllers/media.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/search", mediaController.search);
router.get("/search/:type", mediaController.searchName);
router.get("/genres", mediaController.getGenres);
router.get("/detail", mediaController.getDetail);
router.get("", mediaController.getList);
router.get("/:type", mediaController.getListByContent);
router.get("/review", mediaController.getReviewByID);
router.get("/detailEvaluate/:mediaId", mediaController.getEvaluateReviews);

export default router;
