import { axiosInstance } from "../api/api";

// Signup
export const signup = async (userData) => {
  const res = await axiosInstance.post("/users/signup", userData);
  return res.data;
};

// Login
export const login = async (userData) => {
  const res = await axiosInstance.post("/users/login", userData);
  return res.data;
};

// Logout
export const logout = async () => {
  const res = await axiosInstance.post("/users/logout");
  return res.data;
};

// Get current logged-in user
export const getCurrentUserAPI = async () => {
  const res = await axiosInstance.get("/users/me", { withCredentials: true });
  return res.data.user; // assuming backend returns { user: {...} }
};
