import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './MyOrders.css';
import sampleImg from '../../Images/slider1.jpg'; // actual product image
import cakeNotFound from '../../Images/404.png'; // empty state image

const ordersData = [
  {
    id: '234535',
    name: 'Beery Passion Tart',
    category: 'Berry Rasp',
    size: '6 Inches',
    description:
      'Savor The Marriage Of Intensified Raspberries And Tart Passion Fruit Coupled With A Buttery Vanilla Almond Crust In Our Latest Drop',
    placedAt: '04/07/2025',
    status: 'Delivered',
    total: 1399,
    type: 'Store Pickup',
    address: 'La Scorch Bakery, Shop No. 101, Navi Mumbai',
    deliveryDate: '06/07/25',
    image: sampleImg,
  },
  {
    id: '234536',
    name: 'Beery Passion Tart',
    category: 'Berry Rasp',
    size: '6 Inches',
    description:
      'Savor The Marriage Of Intensified Raspberries And Tart Passion Fruit Coupled With A Buttery Vanilla Almond Crust In Our Latest Drop',
    placedAt: '04/07/2025',
    status: 'Delivered',
    total: 1399,
    type: 'Delivery',
    address: 'Off Shore Society, Room No 345, Navi Mumbai',
    deliveryDate: '06/07/25',
    image: sampleImg,
  },
];

const MyOrders = () => {
  const [filter, setFilter] = useState('All');
   const navigate = useNavigate();

  const filteredOrders =
    filter === 'All'
      ? ordersData
      : ordersData.filter((order) => order.status === filter);

  return (
    <div className="my-orders-container">
      <h4 className="view-past-title">View Your Past Orders</h4>
      <h2 className="orders-title">Your Orders</h2>

      <div className="order-filters">
        <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>
          All
        </button>
        <button className={filter === 'Delivered' ? 'active' : ''} onClick={() => setFilter('Delivered')}>
          Delivered
        </button>
        <button className={filter === 'In-Kitchen' ? 'active' : ''} onClick={() => setFilter('In-Kitchen')}>
          In-Kitchen
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-orders-container">
          <img src={cakeNotFound} alt="No orders" className="no-orders-image" />
          <p className="no-orders-text">No orders here!</p>
        </div>
      ) : (
        filteredOrders.map((order) => (
          <div
            className="order-card clickable"
            key={order.id}
            onClick={() => navigate('/track-order')} // ⬅️ Navigate on click
          >
            <img src={order.image} alt={order.name} className="order-image" />
            <div className="order-details">
              <p className="order-category">{order.category}</p>
              <h3 className="order-name">{order.name} | {order.size}</h3>
              <p className="order-desc">{order.description}</p>

              <div className="order-meta-MO">
                <span>Placed At : {order.placedAt}</span>
                <span>
                  Order Status :{' '}
                  <strong className={`status-${order.status.toLowerCase().replace(/\s/g, '-')}`}>
                    {order.status}
                  </strong>
                </span>
                <span>Total Amount : ₹{order.total}/-</span>
                <span>Type : {order.type}</span>
                <span>Order ID : #{order.id}</span>
              </div>

              <p className="order-address">
                {order.type === 'Store Pickup'
                  ? `Pickup At : ${order.address}`
                  : `Delivery Address : ${order.address}`}
              </p>
            </div>

            <div className="order-actions">
              <button className="buy-again-btn">Buy Again</button>
              <p className="delivery-date-MO">
                {order.status === 'Delivered' ? 'Delivered On' : 'Pickup On'} : {order.deliveryDate}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
