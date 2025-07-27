import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';
import sampleImg from '../../Images/slider1.jpg'; // Replace with actual image
import pencilIcon from '../../Images/pen.png';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [showSizePopupIndex, setShowSizePopupIndex] = useState(null);
  const sizePopupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mockItems = [
      {
        id: 1,
        name: 'Beery Passion Tart',
        category: 'Berry Rasp',
        description:
          'Savor The Marriage Of Intensified Raspberries And Tart Passion Fruit Coupled With A Buttery Vanilla Almond Crust In Our Latest Drop',
        size: 'Petit (6 inches)',
        price: 1399,
        quantity: 1,
        img: sampleImg,
      },
      {
        id: 2,
        name: 'Beery Passion Tart',
        category: 'Berry Rasp',
        description:
          'Savor The Marriage Of Intensified Raspberries And Tart Passion Fruit Coupled With A Buttery Vanilla Almond Crust In Our Latest Drop',
        size: 'Petit (6 inches)',
        price: 1399,
        quantity: 1,
        img: sampleImg,
      },
      {
        id: 3,
        name: 'Beery Passion Tart',
        category: 'Berry Rasp',
        description:
          'Savor The Marriage Of Intensified Raspberries And Tart Passion Fruit Coupled With A Buttery Vanilla Almond Crust In Our Latest Drop',
        size: 'Petit (6 inches)',
        price: 1399,
        quantity: 1,
        img: sampleImg,
      },
    ];
    setCartItems(mockItems);
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sizePopupRef.current &&
        !sizePopupRef.current.contains(event.target)
      ) {
        setShowSizePopupIndex(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuantityChange = (index, type) => {
    const updatedItems = [...cartItems];
    if (type === 'increase') updatedItems[index].quantity += 1;
    else if (type === 'decrease' && updatedItems[index].quantity > 1)
      updatedItems[index].quantity -= 1;

    setCartItems(updatedItems);
  };

  const handleSizeChange = (index, newSize) => {
    const updatedItems = [...cartItems];
    updatedItems[index].size = newSize;
    setCartItems(updatedItems);
    setShowSizePopupIndex(null); // close popup
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <div className="cart-left">
        <h3 className="best-options">Best Options</h3>
        <h1 className="your-cart">Your Cart</h1>
        {cartItems.map((item, index) => (
          <div className="cart-item" key={item.id}>
            <img src={item.img} alt={item.name} className="cart-image" />
            <div className="cart-item-details">
              <p className="cart-category">{item.category}</p>
              <h2 className="cart-name">{item.name}</h2>
              <p className="cart-description">{item.description}</p>

            <div
  className="cart-size"
  onClick={() =>
    setShowSizePopupIndex((prev) => (prev === index ? null : index))
  }
>

                Size : {item.size} <span className="edit-icon">
  <img src={pencilIcon} alt="Edit" style={{ width: '15px', height: '15px' }} />
</span>
                {showSizePopupIndex === index && (
                  <div className="size-popup" ref={sizePopupRef}>
                    {['Petit (6 inches)', 'Petit (8 inches)', 'Petit (12 inches)'].map(
                      (option) => (
                        <div
                          key={option}
                          className="size-option"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent immediate close
                            handleSizeChange(index, option);
                          }}
                        >
                          {option}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="cart-item-controls">
              <p className="cart-price">₹{item.price}/-</p>
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange(index, 'decrease')}>
                  –
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(index, 'increase')}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-right">
        <h3>Choose Delivery Date</h3>
        <input
          type="date"
          className="delivery-date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />
        <div className="cart-subtotal">
          <p>Subtotal ({cartItems.length} items)</p>
          <h2>₹{subtotal.toLocaleString()}</h2>
        </div>
        <button className="checkout-btn" onClick={() => navigate('/checkout')}>
  Proceed to checkout
</button>
      </div>
    </div>
  );
};

export default CartPage;
