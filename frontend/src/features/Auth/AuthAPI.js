// src/features/auth/authAPI.js
import { axiosInstance } from "../api/api";

// Signup
export const signup = async (userData) => {
  try {
    const res = await axiosInstance.post("/users/signup", userData);
    console.log("Signup data", userData);
    return res.data;
  } catch (err) {
    console.error("Signup error:", err.response?.data?.error || err.message);
    throw new Error(err.response?.data?.error || "Signup failed");
  }
};

// Login
export const login = async (userData) => {
  try {
    const res = await axiosInstance.post("/users/login", userData);
    console.log("Login data", userData);
    return res.data;
  } catch (err) {
    console.error("Login error:", err.response?.data?.error || err.message);
    throw new Error(err.response?.data?.error || "Login failed");
  }
};

// Logout
export const logout = async () => {
  try {
    const res = await axiosInstance.post("/users/logout");
    return res.data;
  } catch (err) {
    console.error("Logout error:", err.response?.data?.error || err.message);
    throw new Error(err.response?.data?.error || "Logout failed");
  }
};

// Get Current Logged-in User
export const getCurrentUser = async () => {
  try {
    const res = await axiosInstance.get("/users/current");
    return res.data;
  } catch (err) {
    console.error("Get current user error:", err.response?.data?.error || err.message);
    throw new Error(err.response?.data?.error || "Failed to fetch current user");
  }
};
