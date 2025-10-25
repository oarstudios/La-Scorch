import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

// Routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import creativeRoutes from "./routes/creativeRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import deliveryLocationRoutes from "./routes/deliveryLocationRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";

import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000", // allow React frontend
  credentials: true,               // allow cookies if needed
}));

app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something went wrong!" });
});

// Root endpoint
app.get("/", (req, res) => {
  res.send(`Listening to port number ${process.env.PORT}`);
});

// Start server + connect DB
(async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to server:", error.message);
    process.exit(1);
  }
})();

// API routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/creatives", creativeRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/delivery-locations", deliveryLocationRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/orders", orderRoutes);
