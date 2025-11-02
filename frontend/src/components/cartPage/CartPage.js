import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserById, addToCart } from "../../features/Users/UserSlice";
import "./CartPage.css";
import pencilIcon from "../../Images/pen.png";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Auth and user data
  const { user: authUser, isAuthenticated } = useSelector((state) => state.auth);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const userId = authUser?._id;

  const [showSizePopupIndex, setShowSizePopupIndex] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const sizePopupRef = useRef(null);

  // fetch full user cart details based on auth user
  useEffect(() => {
    if (isAuthenticated && userId) {
      dispatch(getUserById(userId));
    }
  }, [dispatch, isAuthenticated, userId]);

  // Initialize selected sizes from cart data
  const [selectedSizes, setSelectedSizes] = useState({});
  useEffect(() => {
    const sizes = {};
    currentUser?.cart?.forEach((item) => {
      if (item.size && item.size.length) sizes[item._id] = item.size[0].name;
      else if (item.productId?.size && item.productId.size.length) sizes[item._id] = item.productId.size[0].name;
      else sizes[item._id] = null;
    });
    setSelectedSizes(sizes);
  }, [currentUser?.cart]);

  // Handle outside click for size popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sizePopupRef.current && !sizePopupRef.current.contains(event.target)) {
        setShowSizePopupIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update quantity
  const handleQuantityChange = (productId, currentQuantity, type) => {
    let newQuantity = type === "increase" ? currentQuantity + 1 : currentQuantity - 1;
    if (newQuantity < 1) newQuantity = 1;
    dispatch(addToCart({ userId, productId, quantity: newQuantity }));
  };

  // Change size selection
  const handleSizeChange = (itemId, sizeName) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: sizeName }));
  };

  // Calculate price based on selected size
  const getPriceForItem = (item) => {
    const sizeName = selectedSizes[item._id];
    if (!sizeName || !item.productId?.size) return 0;
    const sizeObj = item.productId.size.find((s) => s.name === sizeName);
    return sizeObj ? sizeObj.price : 0;
  };

  // Calculate total sum
  const getTotalPrice = () => {
    return currentUser?.cart.reduce((sum, item) => {
      const price = getPriceForItem(item);
      return sum + price * item.quantity;
    }, 0);
  };

  // Check if all sizes are selected
  const canCheckout = currentUser?.cart?.every((item) => selectedSizes[item._id]) ?? false;

  if (!isAuthenticated) {
    return <div>Please login to view your cart.</div>;
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cart-container">
      {/* Cart Items */}
      <div className="cart-left">
        <h3 className="best-options">Best Options</h3>
        <h1 className="your-cart">Your Cart</h1>
        {currentUser?.cart?.map((item, index) => {
          const price = getPriceForItem(item);
          return (
            <div className="cart-item" key={item._id}>
              <img
                src={`http://localhost:4001${item.productId?.images?.[0]}`}
                alt={item.productId?.name || "Product Image"}
                className="cart-image"
              />
              <div className="cart-item-details">
                <p className="cart-category">{item.productId?.category || "N/A"}</p>
                <h2 className="cart-name">{item.productId?.name || "No Name"}</h2>
                <p className="cart-description">{item.productId?.description || "No Description"}</p>
                <div
                  className="cart-size"
                  onClick={() => setShowSizePopupIndex((prev) => (prev === index ? null : index))}
                >
                  Size: {selectedSizes[item._id] || "N/A"}{" "}
                  <span className="edit-icon">
                    <img src={pencilIcon} alt="Edit" style={{ width: "15px", height: "15px" }} />
                  </span>
                  {showSizePopupIndex === index && (
                    <div className="size-popup" ref={sizePopupRef}>
                      {item.productId?.size?.map((option) => (
                        <div
                          key={option._id}
                          className="size-option"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSizeChange(item._id, option.name);
                          }}
                        >
                          {option.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="cart-item-controls">
                <p className="cart-price">₹{getPriceForItem(item)}/-</p>
                <div className="quantity-selector">
                  <button onClick={() => handleQuantityChange(item.productId._id, item.quantity, "decrease")}>–</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.productId._id, item.quantity, "increase")}>+</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary and checkout */}
      <div className="cart-right">
        <h3>Choose Delivery Date</h3>
        <input
          type="date"
          className="delivery-date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />
        <div className="cart-subtotal">
          <p>Subtotal ({currentUser?.cart?.length || 0} items)</p>
          <h2>₹{getTotalPrice().toLocaleString()}</h2>
        </div>
        <button
          className="checkout-btn"
          disabled={!canCheckout}
          onClick={() => {
            if (canCheckout) {
              navigate("/checkout");
            } else {
              alert("Please select size for all products before checkout");
            }
          }}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
