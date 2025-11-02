import { axiosInstance } from "../api/api";

// Get single user
export const getUserByIdAPI = async (id) => {
  const res = await axiosInstance.get(`/users/${id}`);
  return res.data;
};

// Get all users
export const getAllUsersAPI = async () => {
  const res = await axiosInstance.get(`/users`);
  return res.data;
};

// Update user
export const updateUserAPI = async ({ id, userData }) => {
  const res = await axiosInstance.put(`/users/${id}`, userData);
  return res.data;
};

// Delete user
export const deleteUserAPI = async (id) => {
  const res = await axiosInstance.delete(`/users/${id}`);
  return res.data;
};

// Cart related APIs
export const addToCartAPI = async ({ id, productId, quantity }) => {
  const res = await axiosInstance.post(`/users/${id}/cart`, { productId, quantity });
  return res.data;
};

export const updateCartAPI = async ({ id, cart }) => {
  const res = await axiosInstance.put(`/users/${id}/cart`, { cart });
  return res.data;
};

export const removeFromCartAPI = async ({ id, productId }) => {
  const res = await axiosInstance.delete(`/users/${id}/cart/${productId}`);
  return res.data;
};

export const emptyCartAPI = async (id) => {
  const res = await axiosInstance.delete(`/users/${id}/cart`);
  return res.data;
};

// Address related APIs
export const addAddressAPI = async ({ id, address }) => {
  const res = await axiosInstance.post(`/users/${id}/address`, address);
  return res.data;
};

export const updateAddressAPI = async ({ id, addressId, address }) => {
  const res = await axiosInstance.put(`/users/${id}/address/${addressId}`, address);
  return res.data;
};

export const deleteAddressAPI = async ({ id, addressId }) => {
  const res = await axiosInstance.delete(`/users/${id}/address/${addressId}`);
  return res.data;
};
