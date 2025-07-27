// src/components/orderConfirmation/OrderConfirmation.js
import React from 'react';
import './OrderConfirmation.css';
import { useNavigate } from 'react-router-dom';
import giftCake from '../../Images/ChatGPT Image Jul 14, 2025, 01_27_27 PM 1.png'; // your uploaded image

const OrderConfirmation = () => {
    const navigate = useNavigate();
  return (
    <div className="confirmation-container">
      <img src={giftCake} alt="Gift Cake" className="confirmation-image" />
      <h2 className="confirmation-title">Confirmed by the Kitchen</h2>
      <p className="confirmation-text">
        Will Be Delivered By Monday On 14/07/25 By 6 PM
      </p>
    <button className="track-order-btn" onClick={() => navigate('/track-order')}>
  Track Order
</button>
    </div>
  );
};

export default OrderConfirmation;
