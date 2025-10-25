import { axiosInstance } from "../api/api";

export const fetchCreativesAPI = async () => {
  const res = await axiosInstance.get("/creatives");
  return res.data;
};

export const createCreativesAPI = async (formData) => {
  const res = await axiosInstance.post("/creatives", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

export const updateCreativeAPI = async (id, formData) => {
  const res = await axiosInstance.put(`/creatives/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

export const deleteCreativeAPI = async (id) => {
  const res = await axiosInstance.delete(`/creatives/${id}`);
  return res.data;
};
