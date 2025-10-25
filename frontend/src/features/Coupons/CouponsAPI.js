import { axiosInstance } from "../api/api";

export const fetchCouponsAPI = async (search = "") => {
  const res = await axiosInstance.get(`/coupons${search ? "?search=" + search : ""}`);
  return res.data;
};

export const createCouponAPI = async (data) => {
  const res = await axiosInstance.post("/coupons", data);
  return res.data;
};

export const updateCouponAPI = async (id, data) => {
  const res = await axiosInstance.put(`/coupons/${id}`, data);
  return res.data;
};

export const deleteCouponAPI = async (id) => {
  const res = await axiosInstance.delete(`/coupons/${id}`);
  return res.data;
};
