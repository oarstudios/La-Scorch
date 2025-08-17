import express from "express";
import {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon
} from "../controllers/couponController.js";

const router = express.Router();

router.post("/", createCoupon);       // Create
router.get("/", getCoupons);          // Read all + search
router.get("/:id", getCouponById);    // Read one
router.put("/:id", updateCoupon);     // Update
router.delete("/:id", deleteCoupon);  // Delete

export default router;
