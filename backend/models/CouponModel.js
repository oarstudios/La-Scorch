import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    couponId: {
      type: String,
      unique: true,
      required: true,
       default: () => "C" + (Math.floor(Math.random() * 90000) + 10000).toString()
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },
    discount: {
      type: Number,
      required: true,
      min: 0
    },
    enabled: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Auto-generate couponId before saving (C001, C002, ...)
CouponSchema.pre("save", async function (next) {
  if (!this.couponId) {
    const count = await mongoose.model("Coupon").countDocuments();
    this.couponId = `C${String(count + 1).padStart(3, "0")}`;
  }
  next();
});

const Coupon = mongoose.model("Coupon", CouponSchema);
export default Coupon;
