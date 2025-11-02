import { axiosInstance } from "../api/api";

// Create feedback
export const createFeedbackAPI = async (data) => {
  const res = await axiosInstance.post("/feedbacks", data);
  return res.data;
};

// Get feedbacks by user
export const fetchUserFeedbacksAPI = async (userId) => {
  const res = await axiosInstance.get(`/feedbacks/user/${userId}`);
  return res.data;
};

// Delete feedback by ID
export const deleteFeedbackAPI = async (id) => {
  const res = await axiosInstance.delete(`/feedbacks/${id}`);
  return res.data;
};

// Get all feedbacks
export const fetchAllFeedbacksAPI = async () => {
  const res = await axiosInstance.get(`/feedbacks`);
  return res.data;
};
