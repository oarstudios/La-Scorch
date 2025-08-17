const express = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { default: connectDB } = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
require("dotenv").config();
import creativeRoutes from "./routes/creativeRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import deliveryLocationRoutes from "./routes/deliveryLocationRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

const app = express();

app.use(express.json())
app.use("/uploads", express.static("uploads"));

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something went wrong!" });
});

app.get("/", (req, res) => {
  res.send(`Listening to port number ${process.env.PORT}`);
});


(async () => {
    try{
 await connectDB();

  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
  });
    }catch(error)
    {
console.error('Failed to connect to server', error.message)
process.exit(1)
    }
})();

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use("/api/creatives", creativeRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/delivery-locations", deliveryLocationRoutes);
app.use("/api/blogs", blogRoutes);