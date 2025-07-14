import React, { useState } from 'react';
import './CheckoutPage.css';
import sampleImg from '../../Images/slider1.jpg';

const CheckoutPage = () => {
  const [deliveryMethod, setDeliveryMethod] = useState('Ship'); // 'Ship' or 'Pick Up'
  const [useDifferentAddress, setUseDifferentAddress] = useState(false);

  const cartItems = [
    {
      id: 1,
      name: 'Beery Passion Tart',
      category: 'Berry Rasp',
      size: 'Petit (6 inches)',
      price: 1399,
      quantity: 1,
      img: sampleImg,
    },
    {
      id: 2,
      name: 'Beery Passion Tart',
      category: 'Berry Rasp',
      size: 'Petit (6 inches)',
      price: 1399,
      quantity: 1,
      img: sampleImg,
    },
    {
      id: 3,
      name: 'Beery Passion Tart',
      category: 'Berry Rasp',
      size: 'Petit (6 inches)',
      price: 1399,
      quantity: 1,
      img: sampleImg,
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharge = 500;
  const discount = 500;
  const total = subtotal + deliveryCharge - discount;

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h3 className="back-text">← Back</h3>
        <h1 className="page-title">Enter Details</h1>

        <h4 className='contact-title'>Contact</h4>
        <input className="input-box" placeholder="Enter Your Mail" />

        <h4 className='contact-title'>Delivery</h4>
        <div className="delivery-toggle">
          <button
            className={deliveryMethod === 'Ship' ? 'active' : ''}
            onClick={() => {
              setDeliveryMethod('Ship');
              setUseDifferentAddress(false);
            }}
          >
            Ship
          </button>
          <button
            className={deliveryMethod === 'Pick Up' ? 'active' : ''}
            onClick={() => {
              setDeliveryMethod('Pick Up');
              setUseDifferentAddress(false);
            }}
          >
            Pick Up
          </button>
        </div>

        {deliveryMethod === 'Pick Up' && (
          <div className="pickup-info">
            <p className="store-label">Store Address:</p>
            <p className="store-name">La Scorch Bakery</p>
            <p className="store-address">
              Chakra Andheri – Kurla Road Saki Naka, Vanillla Miel, Mumbai MH
            </p>
          </div>
        )}

        {/* Shipping form only when Ship is selected */}
        {deliveryMethod === 'Ship' && (
          <>
            <input className="input-box" placeholder="Select Region" />
            <div className="row">
              <input className="input-box" placeholder="First Name" />
              <input className="input-box" placeholder="Last Name" />
            </div>
            <input className="input-box" placeholder="Company (Optional)" />
            <input className="input-box" placeholder="Address" />
            <input className="input-box" placeholder="Apartment" />
            <input className="input-box" placeholder="State" />
            <div className="row">
              <input className="input-box" placeholder="City" />
              <input className="input-box" placeholder="Pincode" />
            </div>
            <input className="input-box" placeholder="Phone Number" />
          </>
        )}

        <h4 className='contact-title'>Billing Address</h4>

        {/* Only show "Same/Use Different" toggle for Ship */}
        {deliveryMethod === 'Ship' && (
          <div className="delivery-toggle">
            <button
              className={!useDifferentAddress ? 'active' : ''}
              onClick={() => setUseDifferentAddress(false)}
            >
              Same As Shipping
            </button>
            <button
              className={useDifferentAddress ? 'active' : ''}
              onClick={() => setUseDifferentAddress(true)}
            >
              Use Different Address
            </button>
          </div>
        )}

        {/* Billing address form: always show for Pickup, and when useDifferentAddress is true */}
        {(deliveryMethod === 'Pick Up' || useDifferentAddress) && (
          <>
            <input className="input-box" placeholder="Select Region" />
            <div className="row">
              <input className="input-box" placeholder="First Name" />
              <input className="input-box" placeholder="Last Name" />
            </div>
            <input className="input-box" placeholder="Company (Optional)" />
            <input className="input-box" placeholder="Address" />
            <input className="input-box" placeholder="Apartment" />
            <input className="input-box" placeholder="State" />
            <div className="row">
              <input className="input-box" placeholder="City" />
              <input className="input-box" placeholder="Pincode" />
            </div>
            <input className="input-box" placeholder="Phone Number" />
          </>
        )}
      </div>

      <div className="checkout-right">
        {cartItems.map((item) => (
          <div className="checkout-product" key={item.id}>
            <img src={item.img} alt={item.name} className="checkout-img" />
            <div>
              <p className="cart-category">{item.category}</p>
              <h4 className='cart-name-pro'>{item.name}</h4>
              <p className="cart-size-line">Size : {item.size}</p>
            </div>
            <p className="checkout-price">₹{item.price}/-</p>
          </div>
        ))}

        <div className="discount-code-box">
          <input placeholder="Apply Discount Code" />
          <button className="apply-btn">Apply</button>
        </div>

        <div className="price-breakdown">
          <p className='price-breakdown-title'>Subtotal ({cartItems.length} items)</p>
          <p className='price-breakdown-price'>₹{subtotal}</p>
        </div>
        <div className="price-breakdown">
          <p className='price-breakdown-title'>Delivery Charge</p>
          <p className='price-breakdown-price'>₹{deliveryCharge}</p>
        </div>
        <div className="price-breakdown">
          <p className='price-breakdown-title'>After Code</p>
          <p className='price-breakdown-price'>−₹{discount}</p>
        </div>

        <div className="total-price">
          <p className="total-price-title">Total</p>
          <h2 className="total-price-price">₹{total.toLocaleString()}</h2>
        </div>

        <button className="pay-btn">Pay Now</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
