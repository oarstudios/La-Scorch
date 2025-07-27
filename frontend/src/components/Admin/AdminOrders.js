import React, { useState, useEffect } from "react";
import "./AdminOrders.css";
import AdminOrdersMobile from "./AdminOrdersMobile"; // Mobile version
import img1 from "../../Images/slider1.jpg";
import { FiSearch, FiFilter } from "react-icons/fi";

const AdminOrders = () => {
  const [activeOrder, setActiveOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const ordersPerPage = 15;

  // Mock Order Data (Static)
  const orders = [
    {
      id: "#000001",
      productName: "Dutch Chocolate Truffle Cake",
      address: "501, Elita Apartments, Sector 6, Plot 22, Kamohe, Navi Mumbai, 410209",
      date: "21/12/2024",
      price: "2500",
      status: "Delivered",
      deliveryDate: "12/01/2025",
      deliveryDetails: {
        date: "06/02/2025",
        time: "17:35",
        duration: "90min",
      },
      customer: {
        name: "Omkar Garate",
        customerId: "#000111",
        contact: "+91 99888 77666",
        email: "garateomkar89765432875@gmail.com",
        paymentMethod: "Cash on Delivery",
      },
      orderDetails: [
        { id: 1, name: "Triple Chocolate Cheesecake - Eggless", quantity: 2, images: [img1] },
      ],
    },
    {
      id: "#000002",
      productName: "Black Forest Cake",
      address: "601, Pearl Heights, Lokhandwala, Mumbai, 400053",
      date: "22/12/2024",
      price: "1800",
      status: "Pending",
      deliveryDate: "15/01/2025",
      deliveryDetails: {
        date: "07/02/2025",
        time: "18:15",
        duration: "75min",
      },
      customer: {
        name: "Aarav Patel",
        customerId: "#000222",
        contact: "+91 99888 12345",
        email: "aaravpatel89765432875@gmail.com",
        paymentMethod: "Online Payment",
      },
      orderDetails: [
        { id: 2, name: "Red Velvet Cupcake", quantity: 4, images: [img1] },
        { id: 2, name: "Red Velvet Cupcake", quantity: 4, images: [img1] },
      ],
    },
  ];

  const totalPages = Math.ceil(orders.length / ordersPerPage);

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

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="admin-orders">
      {isMobile ? (
        <AdminOrdersMobile orders={orders} />
      ) : (
        <>
        
          <div className="orders-navigation">
            <div className="admin-prod-search">
                      <FiSearch className="admin-prod-search-icon" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                    </div>
                      <div className="onSort">
                        <button className="active">All Orders</button>
              <button>Completed</button>
              <button>Pending</button>
              <button>Canceled</button>
                      </div>
            
          </div>

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
                {paginateOrders(orders, currentPage, ordersPerPage).map((order, index) => (
                  <React.Fragment key={order.id}>
                    <tr
                      onClick={() => toggleOrderDetails(order.id)}
                      className={`order-row ${activeOrder === order.id ? "active-order" : ""}`}
                    >
                      <td>{index + 1 + (currentPage - 1) * ordersPerPage}</td>
                      <td>{order.id}</td>
                      <td>{order.productName}</td>
                      <td>{order.address}</td>
                      <td>{order.date}</td>
                      <td>{order.price}</td>
                      <td>
                        <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                      </td>
                    </tr>
                    {activeOrder === order.id && (
                      <tr className="order-details-row">
                        <td colSpan="7">
                          <div className="order-details">
                            <div className="customer-details">
                              <h3>Customer Details</h3>
                              <p><strong>Name:</strong> {order.customer.name}</p>
                              <p><strong>Customer ID:</strong> {order.customer.customerId}</p>
                              <p><strong>Contact:</strong> {order.customer.contact}</p>
                              <p><strong>Email:</strong> {order.customer.email}</p>
                              <p><strong>Payment Method:</strong> {order.customer.paymentMethod}</p>
                              <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
                              <p>
                                <strong>Delivery:</strong> Today, {order.deliveryDetails.date}, {order.deliveryDetails.time}, {order.deliveryDetails.duration}
                              </p>
                            </div>
                            <div className="order-items">
                              <h3>Order Details</h3>
                              {order.orderDetails.map((item) => (
                                <div key={item.id} className="order-item">
                                  <img src={item.images} alt={item.name} className="cake-image" />
                                  <span>{item.name}</span>
                                  <span>x{item.quantity}</span>
                                </div>
                              ))}
                            </div>
                            <div className="update-status">
                              <h3>Update Order Status</h3>
                              <button className="Pending">Pending</button>
                              <button className="Delivered">Delivered</button>
                              <button className="Canceled">Canceled</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <span>
              Showing {ordersPerPage * (currentPage - 1) + 1} -{" "}
              {Math.min(ordersPerPage * currentPage, orders.length)} of{" "}
              {orders.length} Orders
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

export default AdminOrders;

