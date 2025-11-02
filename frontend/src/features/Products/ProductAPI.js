// src/features/products/productAPI.js
import axios from "axios";
import { axiosInstance, BASE_URL } from "../api/api";

// Get all products
export const fetchProducts = async () => {
  const res = await axiosInstance.get("/products");
  return res.data;
};

// Get single product
export const fetchProductById = async (id) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data;
};

export const createProductAPI = async (formData) => {
  const res = await axios.post(`${BASE_URL}products`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Fetch products by category ID
export const fetchProductsByCategory = async (categoryId) => {
  const res = await axiosInstance.get(`/products/category/${categoryId}`);
  return res.data;
};


export const updateProductAPI = async (id, formData) => {
  const res = await axiosInstance.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Fetch Bestseller Products
export const fetchBestsellerProducts = async () => {
  const res = await axiosInstance.get("/products/bestsellers");
  return res.data;
};


// Archive product
export const archiveProductAPI = async (id) => {
  const res = await axiosInstance.delete(`/products/${id}`);
  return res.data;
};
