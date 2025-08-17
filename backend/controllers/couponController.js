import Coupon from "../models/Coupon.js";

// Create a coupon
export const createCoupon = async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    const savedCoupon = await coupon.save();
    res.status(201).json(savedCoupon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all coupons (with search)
export const getCoupons = async (req, res) => {
  try {
    const search = req.query.search || "";
    const coupons = await Coupon.find({
      code: { $regex: search, $options: "i" }
    }).sort({ createdAt: -1 });

    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get coupon by ID
export const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).json({ error: "Coupon not found" });
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update coupon
export const updateCoupon = async (req, res) => {
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCoupon) return res.status(404).json({ error: "Coupon not found" });
    res.json(updatedCoupon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete coupon
export const deleteCoupon = async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!deletedCoupon) return res.status(404).json({ error: "Coupon not found" });
    res.json({ message: "Coupon deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
