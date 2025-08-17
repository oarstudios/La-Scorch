import mongoose from "mongoose";

const DeliveryLocationSchema = new mongoose.Schema(
  {
    pincode: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    deliveryCharges: {
      type: Number,
      required: true,
      default: 0
    },
    enabled: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const DeliveryLocation = mongoose.model("DeliveryLocation", DeliveryLocationSchema);
export default DeliveryLocation;
