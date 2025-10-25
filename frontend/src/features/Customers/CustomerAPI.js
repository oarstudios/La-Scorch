import { axiosInstance } from "../api/api";

// Fetch customers by filtering userType=2
export const fetchCustomersAPI = async () => {
  const res = await axiosInstance.get("/users"); // Assuming backend returns all users
  // Filter here only users with userType 2
  const customers = res.data.filter(user => user.userType === 2);
  return customers;
};
