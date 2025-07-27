import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import "./AdminOrders.css";
import "./AdminCustomersDetails.css";
import AdminCustDetMobile from "./AdminCustDetMobile"; // Importing the mobile version

const AdminCustomersDetails = () => {
  const [activeOrder, setActiveOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const ordersPerPage = 15;

  // Mock Users Data
  const users = [
    {
      _id: "CUST001",
      username: "Omkar Garate",
      phoneNo: "+91 99888 77666",
      email: "omkar@example.com",
      gender: "Male",
      age: 29,
      address: {
        firstName: "Omkar",
        lastName: "Garate",
        address: "501, Elita Apartments",
        landmark: "Near Kamohe",
        city: "Navi Mumbai",
        state: "Maharashtra",
        pincode: "410209",
      },
    },
    {
      _id: "CUST002",
      username: "Aarav Patel",
      phoneNo: "+91 99888 12345",
      email: "aarav@example.com",
      gender: "Male",
      age: 34,
      address: {
        firstName: "Aarav",
        lastName: "Patel",
        address: "601, Pearl Heights",
        landmark: "Lokhandwala",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400053",
      },
    },
  ];

  // Mock Bills Data (Linked to Users)
  const bills = [
    { billId: "BILL001", userId: "CUST001", billPrice: 2500 },
    { billId: "BILL002", userId: "CUST001", billPrice: 1800 },
    { billId: "BILL003", userId: "CUST002", billPrice: 3000 },
  ];

  // Search filter function
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    `${user.username} ${user.email} ${user.phoneNo}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the total spent and total number of orders for each user
  const calculateTotalSpentAndOrders = (userId) => {
    const userBills = bills.filter((bill) => bill.userId === userId);
    const totalSpent = userBills.reduce((acc, bill) => acc + parseFloat(bill.billPrice), 0);
    const totalOrders = userBills.length;
    return { totalSpent, totalOrders };
  };

  const totalPages = Math.ceil(filteredUsers.length / ordersPerPage);

  const toggleOrderDetails = (orderId) => {
    setActiveOrder(activeOrder === orderId ? null : orderId);
  };

  const paginateOrders = (orders, currentPage, ordersPerPage) => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    return orders.slice(startIndex, startIndex + ordersPerPage);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setActiveOrder(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatAddress = (address) => {
    return `${address?.firstName} ${address?.lastName}, ${address?.address}, ${address?.landmark}, ${address?.city}, ${address?.state}, ${address?.pincode}`;
  };

  return (
    <div className="admin-orders">
      {/* Search Bar */}
      <div className="admin-prod-search">
                <FiSearch className="admin-prod-search-icon" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>

      {isMobile ? (
        <AdminCustDetMobile orders={filteredUsers} currentPage={currentPage} ordersPerPage={ordersPerPage} />
      ) : (
        <>
          <div className="orders-list">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer ID</th>
                  <th>Customer Name</th>
                  <th>Address</th>
                  <th>Total Spent</th>
                  <th>No. of Orders</th>
                </tr>
              </thead>
              <tbody>
                {paginateOrders(filteredUsers, currentPage, ordersPerPage).map((user, index) => {
                  const { totalSpent, totalOrders } = calculateTotalSpentAndOrders(user._id);
                  return (
                    <React.Fragment key={user._id}>
                      <tr
                        onClick={() => toggleOrderDetails(user._id)}
                        className={`order-row ${activeOrder === user._id ? "active-order" : ""}`}
                      >
                        <td>{index + 1 + (currentPage - 1) * ordersPerPage}</td>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user?.address ? formatAddress(user?.address) : "-"}</td>
                        <td>₹{totalSpent}</td>
                        <td>{totalOrders}</td>
                      </tr>
                      {activeOrder === user._id && (
                        <tr className={`order-details-row ${activeOrder === user._id ? "active-order-details" : ""}`}>
                          <td colSpan="6">
                            <div className="admin-order-details">
                              <div className="admin-customer-details">
                                <h3>Customer Details</h3>
                                <p><strong>Name:</strong> {user?.username}</p>
                                <p><strong>Customer ID:</strong> {user?._id}</p>
                                <p><strong>Contact:</strong> {user?.phoneNo}</p>
                                <p><strong>Email:</strong> {user?.email}</p>
                                <p><strong>Gender:</strong> {user?.gender}</p>
                                <p><strong>Age:</strong> {user?.age}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <span>
              Showing {ordersPerPage * (currentPage - 1) + 1} -{" "}
              {Math.min(ordersPerPage * currentPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} Users
            </span>
            <button
              className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`pagination-btn ${currentPage === i + 1 ? "active-page" : ""}`}
                onClick={() => handlePageClick(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminCustomersDetails;
