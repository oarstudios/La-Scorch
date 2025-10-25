import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  region: { type: String, required: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  company: { type: String, trim: true },
  address: { type: String, required: true, trim: true },
  apartment: { type: String, trim: true },
  state: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  pincode: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true, trim: true }
}, { _id: false });

const OrderItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  size: { type: String, required: true, trim: true },
  quantity: { 
    type: Number, 
    required: true, 
    min: [1, "Quantity must be at least 1"] 
  },
  price: { 
    type: Number, 
    required: true,
    min: [0, "Price must be positive"] 
  },
  image: { type: String, trim: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  deliveryType: { 
    type: String, 
    enum: ['Ship', 'Pick Up'], 
    required: true 
  },
  contact: {
    email: { 
      type: String, 
      required: true, 
      trim: true, 
      match: [/.+@.+\..+/, 'Please fill a valid email address']
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shippingAddress: { type: AddressSchema },
  pickupLocation: { type: String, trim: true },
  billingAddress: { type: AddressSchema },
  billingSameAsShipping: { type: Boolean, default: true },
  items: { 
    type: [OrderItemSchema], 
    required: true, 
    validate: {
      validator: function(arr) {
        return arr.length > 0;
      },
      message: "Order must have at least one item"
    }
  },
  discountCode: { type: String, trim: true },
  discountAmount: { type: Number, default: 0, min: 0 },
  deliveryCharge: { type: Number, default: 0, min: 0 },
  subtotal: { type: Number, required: true, min: 0 },
  status: { type: String, default: "Pending", enum: ["Pending", "Completed", "Canceled"] },
  total: { type: Number, required: true, min: 0 }
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);
