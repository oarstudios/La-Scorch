import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/Auth/AuthSlice'
import productReducer from '../features/Products/ProductSlice'
import creativesReducer from '../features/Creatives/CreativesSlice'
import couponReducer from '../features/Coupons/CouponsSlice'
import deliveryReducer from '../features/DeliveryPricing/DeliverySlice'
import blogReducer from '../features/Blogs/BlogSlice'
import customerReducer from '../features/Customers/CustomerSlice'
import orderReducer from '../features/Orders/OrderSlice'
import categorReducer from '../features/Categories/CategorySlice'
import feedbackReducer from '../features/Feedback/feedbackSlice'
import userReducer from '../features/Users/UserSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer, 
    creatives: creativesReducer,
    coupons: couponReducer,
    delivery: deliveryReducer,
    blogs: blogReducer,
    customers: customerReducer,
    orders: orderReducer,
    category: categorReducer,
    feedback: feedbackReducer,
    user: userReducer,
  },
});
