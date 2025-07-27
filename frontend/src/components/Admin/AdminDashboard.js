import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = parseInt(value.replace(/,/g, ""));
    if (count === end) return;

    const duration = 2000;
    const step = Math.ceil(end / (duration / 20));
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
  return (
    <div className="admin-dashboard">
      <div className="dashboard-row">
        <a href="/admin" className="dashboard-link">
          <div className="dashboard-card full-width">
            <AnimatedNumber value="1000000" />
            <p>REVENUE</p>
          </div>
        </a>
        <a href="/admin/customers" className="dashboard-link">
          <div className="dashboard-card full-width">
            <AnimatedNumber value="1291" />
            <p>CUSTOMERS</p>
          </div>
        </a>
        <a href="/admin/creatives" className="dashboard-link">
          <div className="dashboard-card full-width">
            <h2>WEBSITE</h2>
            <p>CMS</p>
          </div>
        </a>
      </div>

      <div className="dashboard-row">
        <a href="/admin/customer-orders" className="dashboard-link">
          <div className="dashboard-card half-width">
            <AnimatedNumber value="10973" />
            <p>ORDERS</p>
          </div>
        </a>
        <a href="/admin/delivery-pricing" className="dashboard-link">
          <div className="dashboard-card half-width">
            <AnimatedNumber value="21" />
            <p>LOCATIONS</p>
          </div>
        </a>
        <a href="/admin/products" className="dashboard-link">
          <div className="dashboard-card half-width">
            <AnimatedNumber value="52" />
            <p>PRODUCTS</p>
          </div>
        </a>
        <a href="/admin/quick-pricing" className="dashboard-link">
          <div className="dashboard-card half-width">
            <h2>QUICK</h2>
            <p>PRICING</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;
