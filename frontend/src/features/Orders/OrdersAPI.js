import { axiosInstance } from "../api/api";

export const fetchOrdersAPI = async () => {
  const res = await axiosInstance.get("/orders");
  return res.data;
};

export const fetchOrderByIdAPI = async (id) => {
  const res = await axiosInstance.get(`/orders/${id}`);
  return res.data;
};

export const createOrderAPI = async (formData) => {
  const res = await axiosInstance.post("/orders", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

export const updateOrderAPI = async (id, data) => {
  const res = await axiosInstance.put(`/orders/${id}`, data);
  return res.data;
};

export const deleteOrderAPI = async (id) => {
  const res = await axiosInstance.delete(`/orders/${id}`);
  return res.data;
};
