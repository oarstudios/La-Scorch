import express from "express";
import multer from "multer";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
} from "../controllers/blogController.js";

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // save in /uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.put("/:id", upload.single("image"), updateBlog);
router.delete("/:id", deleteBlog);

export default router;
