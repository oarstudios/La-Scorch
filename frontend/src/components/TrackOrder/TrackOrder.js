// src/components/trackOrder/TrackOrder.js
import React from 'react';
import './TrackOrder.css';
import sampleImg from '../../Images/slider1.jpg'; // use actual product image

const TrackOrder = () => {
  const orderItems = [
    {
      id: 1,
      name: 'Beery Passion Tart',
      category: 'Berry Rasp',
      size: 'Petit (6 Inches)',
      price: 1399,
      img: sampleImg,
    },
    {
      id: 2,
      name: 'Beery Passion Tart',
      category: 'Berry Rasp',
      size: 'Petit (6 Inches)',
      price: 1399,
      img: sampleImg,
    },
    {
      id: 3,
      name: 'Beery Passion Tart',
      category: 'Berry Rasp',
      size: 'Petit (6 Inches)',
      price: 1399,
      img: sampleImg,
    },
  ];
  const status = 'Delivered'; // or 'Delivered'
const deliveryDate = '14/07/25';
const deliveryTime = '03:24 PM';
  const subtotal = 4560;
  const delivery = 500;
  const discount = 500;
  const total = subtotal + delivery - discount;
  const getStatusClass = () => {
  if (status === 'Delivered') return 'status-success';
  if (status === 'Pending') return 'status-pending';
  return 'status-default';
};

  return (
    <div className="track-order-container">
      <div className="track-left">
        <p className="back-text">← Back</p>
        <h2 className="order-id">Order ID #12345</h2>
        <p className="order-status">
 <span className={getStatusClass()}>
    {status === 'Delivered'
      ? `  Order Status : Delivered On ${deliveryDate} At ${deliveryTime}`
      : `  Order Status : Pending will be delivered by ${deliveryDate}`}
  </span>
</p>

        <h4 className="address-title">Delivery Address</h4>
        <div className="address-box">
          <div className="row">
            <input readOnly value="Girish" />
            <input readOnly value="Shedge" />
          </div>
          <input readOnly value="Yashwant Shrushti, 9/D/403, Navapur Naka, Boisar, Maharashtra" />
          <input readOnly value="Near Rahul International School" />
          <input readOnly value="Maharashtra" />
          <div className="row">
            <input readOnly value="Boisar" />
            <input readOnly value="401501" />
          </div>
          <input readOnly value="9373869224" />
        </div>
      </div>

      <div className="track-right">
        <p className="order-meta">Placed At : 04/07/2025</p>
        <p className="order-meta">Type : Store Pickup</p>

        <h4 className="total-items">Total Items : {orderItems.length}</h4>
        {orderItems.map((item) => (
          <div className="order-product" key={item.id}>
            <img src={item.img} alt={item.name} />
            <div className="item-details">
              <p className="item-category">{item.category}</p>
              <h5 className="item-name">{item.name}</h5>
              <p className="item-size">Size : {item.size}</p>
            </div>
            <p className="item-price">₹{item.price}/-</p>
          </div>
        ))}

        <div className="bill-summary">
          <h4 className='bill-summary-text'>Bill Summary</h4>
          <div className="summary-line">
            <span>Subtotal ({orderItems.length} items)</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="summary-line">
            <span>Delivery Charge</span>
            <span>₹{delivery}</span>
          </div>
          <div className="summary-line">
            <span>After Discount Code</span>
            <span>−₹{discount}</span>
          </div>
          <div className="summary-line total">
            <strong>Total Bill</strong>
            <strong>₹{total}</strong>
          </div>
          <p className="coupon-msg">Saved ₹500 With Coupon Code <strong>#MyFirstCake</strong></p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
