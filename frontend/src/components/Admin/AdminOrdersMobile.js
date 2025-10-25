import React, { useState, useEffect } from "react";
import "./AdminOrdersMobile.css";
import { FiSearch } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, updateOrder } from "../../features/Orders/OrderSlice";

const AdminOrdersMobile = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const ordersPerPage = 15;

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const toggleDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleFilterClick = (status) => {
    setFilter(status);
    setCurrentPage(1);
  };

  const handleStatusUpdate = (orderId, newStatus) => {
      dispatch(updateOrder({ id: orderId, data: { status: newStatus } }));
    };

  const filterOrders = (orders, filter) => {
    if (filter === "All") return orders;
    return orders.filter((order) => order.status === filter);
  };

  const paginateOrders = (orders, currentPage, ordersPerPage) => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    return orders.slice(startIndex, startIndex + ordersPerPage);
  };

  const filteredByStatus = filterOrders(orders, filter);
  const filteredOrders = filteredByStatus.filter(
    (order) =>
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedOrders = paginateOrders(filteredOrders, currentPage, ordersPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setExpandedOrderId(null);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="orders-list-mobile">
      <div className="admin-prod-search">
        <FiSearch className="admin-prod-search-icon" />
        <input
          type="text"
          placeholder="Search products or customers..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="orders-navigation">
        <button className={filter === "All" ? "active" : ""} onClick={() => handleFilterClick("All")}>
          All Orders
        </button>
        <button className={filter === "Delivered" ? "active" : ""} onClick={() => handleFilterClick("Delivered")}>
          Completed
        </button>
        <button className={filter === "Pending" ? "active" : ""} onClick={() => handleFilterClick("Pending")}>
          Pending
        </button>
        <button className={filter === "Canceled" ? "active" : ""} onClick={() => handleFilterClick("Canceled")}>
          Canceled
        </button>
      </div>

      {paginatedOrders.map((order) => (
        <div key={order._id} className="order-container">
          <div className="order-row-mobile" onClick={() => toggleDetails(order._id)}>
            <p><strong>Order Date:</strong> {order.date}</p>
            <p><strong>Product:</strong> {order.productName}</p>
            <p><strong>Status:</strong> <button className={`status-button ${order.status}`}>{order.status}</button></p>
          </div>

          {expandedOrderId === order._id && (
            <div className="order-details-row-mobile">
              <div className="customer-details">
                <h3>Customer Details</h3>
                <p><strong>Name:</strong> {order.customer.name}</p>
                <p><strong>Customer ID:</strong> {order.customer.customerId}</p>
                <p><strong>Contact:</strong> {order.customer.contact}</p>
                <p><strong>Email:</strong> {order.customer.email}</p>
                <p><strong>Payment Method:</strong> {order.customer.paymentMethod}</p>
                <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
                <p><strong>Delivery:</strong> Today, {order.deliveryDetails.date}, {order.deliveryDetails.time}, {order.deliveryDetails.duration}</p>
              </div>

              <div className="order-extra-details">
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Total Price:</strong> ₹{parseFloat(order.price).toFixed(2)}</p>
              </div>

              <div className="order-items-mobile">
                <h3>Order Details</h3>
                <p className="orderID"><strong>Order ID:</strong> {order.id}</p>
                {order.orderDetails.map((item) => (
                  <div key={item.id} className="order-item-mobile">
                    <div className="image-container">
                      {item.images.map((image, imgIndex) => (
                        <img key={imgIndex} src={image} alt={`${item.name} ${imgIndex + 1}`} className="order-item-image-mobile" />
                      ))}
                    </div>
                    <div className="order-item-details-mobile">
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                    </div>
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
          )}
        </div>
      ))}

      <div className="pagination">
        <button
          className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, i) => (
          <button
            key={i + 1}
            className={`pagination-btn ${currentPage === i + 1 ? "active-page" : ""}`}
            onClick={() => handlePageClick(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={`pagination-btn ${currentPage === Math.ceil(filteredOrders.length / ordersPerPage) ? "disabled" : ""}`}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredOrders.length / ordersPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminOrdersMobile;
