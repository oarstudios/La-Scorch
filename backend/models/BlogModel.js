import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    subheading: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String, // will store file path or URL
      required: false,
    },
    published: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
