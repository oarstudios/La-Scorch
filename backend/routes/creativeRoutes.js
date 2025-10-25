const express = require("express");
const router = express.Router();
const upload = require("../middlewares/creativeUpload");
const { uploadCreative, getCreatives, updateCreative, deleteCreative } = require("../controllers/creativeController");

router.post("/", upload, uploadCreative);
router.get("/", getCreatives);
router.put("/:creativeId", upload, updateCreative);
router.delete("/:creativeId", deleteCreative);

module.exports = router;