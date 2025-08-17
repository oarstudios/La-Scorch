import Blog from "../models/Blog.js";

// Create blog
export const createBlog = async (req, res) => {
  try {
    const { heading, subheading, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const blog = new Blog({ heading, subheading, content, image });
    const saved = await blog.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single blog
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { heading, subheading, content } = req.body;
    const updateData = { heading, subheading, content };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) return res.status(404).json({ error: "Blog not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
