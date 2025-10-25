import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../features/Customers/CustomerSlice";
import "./AdminOrdersMobile.css";

const AdminCustDetMobile = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.customers);
  
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const totalPages = Math.ceil(customers.length / ordersPerPage);

  const toggleDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const paginateUsers = (users, currentPage, ordersPerPage) => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    return users.slice(startIndex, startIndex + ordersPerPage);
  };

  const paginatedUsers = paginateUsers(customers, currentPage, ordersPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setExpandedOrderId(null);
  };

  return (
    <div className="orders-list-mobile">
      {/* Orders List */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : paginatedUsers.length === 0 ? (
        <p style={{ textAlign: "center", opacity: 0.6 }}>No customers</p>
      ) : (
        paginatedUsers.map((user) => (
          <div key={user._id} className="order-container">
            {/* Minimal details shown initially */}
            <div className="order-row-mobile" onClick={() => toggleDetails(user._id)}>
              <p>
                <strong>Customer Name:</strong> {user.username}
              </p>
              <p>
                <strong>No. of Orders:</strong> {user.orders || 0}
              </p>
              <p>
                <strong>Total Spent:</strong> ₹{user.totalSpent || 0}
              </p>
            </div>

            {/* Expanded details */}
            {expandedOrderId === user._id && (
              <div className="order-details-row-mobile">
                {/* Customer Details */}
                <div className="customer-details">
                  <h3>Customer Details</h3>
                  <p>
                    <strong>Name:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Customer ID:</strong> {user.userId}
                  </p>
                  <p>
                    <strong>Contact:</strong> {user.phoneNo}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Gender:</strong> {user.gender}
                  </p>
                  <p>
                    <strong>Age:</strong> {user.age}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))
      )}

      {/* Pagination */}
      <div className="pagination">
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
    </div>
  );
};

export default AdminCustDetMobile;
