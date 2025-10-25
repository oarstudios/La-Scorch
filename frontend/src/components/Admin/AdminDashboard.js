import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import { fetchOrdersAPI } from "../../features/Orders/OrdersAPI";
import { fetchCustomersAPI } from "../../features/Customers/CustomerAPI";
import { fetchLocationsAPI } from "../../features/DeliveryPricing/DeliveryAPI";
import { fetchProducts } from "../../features/Products/ProductAPI";
const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = parseInt(value.toString().replace(/,/g, ""));
    if (count === end) return;

    const duration = 2000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newValue = Math.floor(progress * end);
      setCount(newValue);
      if (progress >= 1) clearInterval(timer);
    }, 20);

    return () => clearInterval(timer);
  }, [value]);

  return <h2>{count.toLocaleString()}</h2>;
};

const AdminDashboard = () => {
  const [revenue, setRevenue] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [locationsCount, setLocationsCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch orders and calculate revenue and orders count
        const orders = await fetchOrdersAPI();
        setOrdersCount(orders.length);
        const totalRevenue = orders.reduce((sum, order) => sum + (order.total ?? 0), 0);
        setRevenue(totalRevenue);

        // Fetch customers count
        const customers = await fetchCustomersAPI();
        setCustomersCount(customers.length);

        // Fetch delivery locations count
        const locations = await fetchLocationsAPI();
        setLocationsCount(locations.length);

        // Fetch products count
        const products = await fetchProducts();
        setProductsCount(products.length);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-row">
        <Link to="/admin" className="dashboard-link">
          <div className="dashboard-card full-width">
            <AnimatedNumber value={revenue} />
            <p>REVENUE</p>
          </div>
        </Link>
        <Link to="/admin/customers" className="dashboard-link">
          <div className="dashboard-card full-width">
            <AnimatedNumber value={customersCount} />
            <p>CUSTOMERS</p>
          </div>
        </Link>
        <Link to="/admin/creatives" className="dashboard-link">
          <div className="dashboard-card full-width">
            <h2>WEBSITE</h2>
            <p>CMS</p>
          </div>
        </Link>
      </div>

      <div className="dashboard-row">
        <Link to="/admin/customer-orders" className="dashboard-link">
          <div className="dashboard-card half-width">
            <AnimatedNumber value={ordersCount} />
            <p>ORDERS</p>
          </div>
        </Link>
        <Link to="/admin/delivery-pricing" className="dashboard-link">
          <div className="dashboard-card half-width">
            <AnimatedNumber value={locationsCount} />
            <p>LOCATIONS</p>
          </div>
        </Link>
        <Link to="/admin/products" className="dashboard-link">
          <div className="dashboard-card half-width">
            <AnimatedNumber value={productsCount} />
            <p>PRODUCTS</p>
          </div>
        </Link>
        <Link to="/admin/quick-pricing" className="dashboard-link">
          <div className="dashboard-card half-width">
            <h2>QUICK</h2>
            <p>PRICING</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
