import React, { useState, useEffect } from "react";
import "./AdminOrders.css";
import AdminOrdersMobile from "./AdminOrdersMobile";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrder } from "../../features/Orders/OrderSlice";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  const [activeOrder, setActiveOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const ordersPerPage = 15;

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 450);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStatusUpdate = (orderId, newStatus) => {
    dispatch(updateOrder({ id: orderId, data: { status: newStatus } }));
  };

  // Filter orders by status
  const filteredByStatus = filter === "All"
    ? orders
    : orders?.filter((order) => order?.status === filter);

  // Filter by search query safely
  const filteredOrders = filteredByStatus.filter((order) => {
    const productName = order.productName ?? "";
    const customerName = order.customer?.name ?? "";
    return (
      productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

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

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleFilterClick = (status) => {
    setFilter(status);
    setCurrentPage(1);
    setActiveOrder(null);
  };

  // Safe address formatter
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.address ?? ""}, ${address.city ?? ""}, ${address.state ?? ""}, ${address.pincode ?? ""}`;
  };

  return (
    <div className="admin-orders">
      <div className="orders-navigation">
        <div className="admin-prod-search">
          <FiSearch className="admin-prod-search-icon" />
          <input
            type="text"
            placeholder="Search products or customers..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="onSort">
          <button
            className={filter === "All" ? "active" : ""}
            onClick={() => handleFilterClick("All")}
          >
            All Orders
          </button>
          <button
            className={filter === "Delivered" ? "active" : ""}
            onClick={() => handleFilterClick("Delivered")}
          >
            Completed
          </button>
          <button
            className={filter === "Pending" ? "active" : ""}
            onClick={() => handleFilterClick("Pending")}
          >
            Pending
          </button>
          <button
            className={filter === "Canceled" ? "active" : ""}
            onClick={() => handleFilterClick("Canceled")}
          >
            Canceled
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : isMobile ? (
        <AdminOrdersMobile orders={filteredOrders} />
      ) : filteredOrders.length === 0 ? (
        <div style={{ marginTop: 20, opacity: 0.6, textAlign: "center" }}>
          No orders yet
        </div>
      ) : (
        <>
          <div className="orders-list">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Product Name</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginateOrders(filteredOrders, currentPage, ordersPerPage).map(
                  (order, index) => (
                    <React.Fragment key={order._id}>
                      <tr
                        onClick={() => toggleOrderDetails(order._id)}
                        className={`order-row ${
                          activeOrder === order._id ? "active-order" : ""
                        }`}
                      >
                        <td>{index + 1 + (currentPage - 1) * ordersPerPage}</td>
                        <td>{order.id}</td>
                        <td>{order.productName ?? ""}</td>
                        <td>{formatAddress(order.shippingAddress)}</td>
                        <td>{order.date ?? ""}</td>
                        <td>{order.price ?? ""}</td>
                        <td>
                          <span
                            className={`status ${(order.status ?? "").toLowerCase()}`}
                          >
                            {order.status ?? ""}
                          </span>
                        </td>
                      </tr>
                      {activeOrder === order._id && (
                        <tr className="order-details-row">
                          <td colSpan="7">
                            <div className="order-details">
                              <div className="customer-details">
                                <h3>Customer Details</h3>
                                <p><strong>Name:</strong> {order.customer?.name ?? ""}</p>
                                <p><strong>Customer ID:</strong> {order.customer?.customerId ?? ""}</p>
                                <p><strong>Contact:</strong> {order.customer?.contact ?? ""}</p>
                                <p><strong>Email:</strong> {order.customer?.email ?? ""}</p>
                                <p><strong>Payment Method:</strong> {order.customer?.paymentMethod ?? ""}</p>
                                <p><strong>Delivery Date:</strong> {order.deliveryDate ?? ""}</p>
                                <p>
                                  <strong>Delivery:</strong> Today, {order.deliveryDetails?.date ?? ""}, {order.deliveryDetails?.time ?? ""}, {order.deliveryDetails?.duration ?? ""}
                                </p>
                              </div>
                              <div className="order-items">
                                <h3>Order Details</h3>
                                {order.items?.map((item) => (
                                  <div key={item.productId} className="order-item">
                                    <img src={item.image ?? ""} alt={item.name ?? ""} className="cake-image" />
                                    <span>{item.name ?? ""}</span>
                                    <span>x{item.quantity ?? ""}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="update-status">
    <h3>Update Order Status</h3>
    <button
      disabled={(order.status ?? '') === 'Pending'}
      className="Pending"
      onClick={() => handleStatusUpdate(order._id, 'Pending')}
    >
      Pending
    </button>
    <button
      disabled={(order.status ?? '') === 'Delivered'}
      className="Delivered"
      onClick={() => handleStatusUpdate(order._id, 'Delivered')}
    >
      Delivered
    </button>
    <button
      disabled={(order.status ?? '') === 'Canceled'}
      className="Canceled"
      onClick={() => handleStatusUpdate(order._id, 'Canceled')}
    >
      Canceled
    </button>
  </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <span>
              Showing {ordersPerPage * (currentPage - 1) + 1} -{" "}
              {Math.min(ordersPerPage * currentPage, filteredOrders.length)} of{" "}
              {filteredOrders.length} Orders
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

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AdminOrders;
