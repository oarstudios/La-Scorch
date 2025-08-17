import express from "express";
import upload from "../middleware/upload.js";
import {
  createCreatives,
  getCreatives,
  getCreativeById,
  updateCreative,
  deleteCreative
} from "../controllers/creativesController.js";

const router = express.Router();

// Upload fields (accept multiple named files)
router.post(
  "/",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  createCreatives
);

router.get("/", getCreatives);
router.get("/:id", getCreativeById);

router.put(
  "/:id",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  updateCreative
);

router.delete("/:id", deleteCreative);

export default router;
