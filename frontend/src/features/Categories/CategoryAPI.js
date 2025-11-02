import { axiosInstance } from '../api/api'

// Get all categories
export const getCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

// Get category by ID
export const getCategoryById = async (id) => {
  const response = await axiosInstance.get(`/categories/${id}`);
  return response.data;
};

// Create category
export const createCategory = async (data) => {
  const response = await axiosInstance.post("/categories", data);
  return response.data;
};

// Update category
export const updateCategory = async (id, data) => {
  const response = await axiosInstance.put(`/categories/${id}`, data);
  return response.data;
};

// Delete category
export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`/categories/${id}`);
  return response.data;
};
