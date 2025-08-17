import mongoose from "mongoose";

const CreativeSchema = new mongoose.Schema({
  image1: { type: String },
  image2: { type: String },
  image3: { type: String },
}, { timestamps: true });

const Creatives = mongoose.model("Creatives", CreativeSchema);
export default Creatives;
