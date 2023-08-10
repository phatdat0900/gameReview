import express from "express";
import mediaController from "../controllers/media.controller.js";

const router = express.Router({ mergeParams: true });

// router.get("/search", mediaController.search);
router.get("/search", mediaController.search);
router.get("/detail", mediaController.getDetail);
router.get("", mediaController.getList);
router.get("/:type", mediaController.getListByContent);
export default router;
