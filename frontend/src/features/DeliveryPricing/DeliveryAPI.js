import { axiosInstance } from "../api/api";

export const fetchLocationsAPI = async (search = "") => {
  const res = await axiosInstance.get(`/delivery-locations${search ? "?search=" + search : ""}`);
  return res.data;
};

export const createLocationAPI = async (data) => {
  const res = await axiosInstance.post("/delivery-locations", data);
  return res.data;
};

export const updateLocationAPI = async (id, data) => {
  const res = await axiosInstance.put(`/delivery-locations/${id}`, data);
  return res.data;
};

export const deleteLocationAPI = async (id) => {
  const res = await axiosInstance.delete(`/delivery-locations/${id}`);
  return res.data;
};
