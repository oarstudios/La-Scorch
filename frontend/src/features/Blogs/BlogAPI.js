import { axiosInstance } from "../api/api";

// Get all blogs
export const fetchBlogsAPI = async () => {
  const res = await axiosInstance.get("/blogs");
  return res.data;
};

// Create blog (with image)
export const createBlogAPI = async (formData) => {
  const res = await axiosInstance.post("/blogs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Update blog (with optional image)
export const updateBlogAPI = async (id, formData) => {
  const res = await axiosInstance.put(`/blogs/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Delete blog
export const deleteBlogAPI = async (id) => {
  const res = await axiosInstance.delete(`/blogs/${id}`);
  return res.data;
};
