import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  region: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  company: { type: String },
  address: { type: String },
  apartment: { type: String },
  state: { type: String },
  city: { type: String },
  pincode: { type: String },
  phoneNumber: { type: String }
}, { _id: false });

const OrderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  deliveryType: { type: String, enum: ['Ship', 'Pick Up'], required: true },
  contact: {
    email: { type: String, required: true }
  },
  shippingAddress: { type: AddressSchema },
  pickupLocation: { type: String },
  billingAddress: { type: AddressSchema },
  billingSameAsShipping: { type: Boolean, default: true },
  items: { type: [OrderItemSchema], required: true },
  discountCode: { type: String },
  discountAmount: { type: Number, default: 0 },
  deliveryCharge: { type: Number, default: 0 },
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true }
});

export default mongoose.model("Order", OrderSchema);