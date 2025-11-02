import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../features/Categories/CategorySlice";
import { getProductsByCategory } from "../../features/Products/ProductSlice";
import { addToCart, updateCartQuantity } from "../../features/Users/UserSlice"; // add your update quantity thunk
import "./CategorySection.css";
import sampleImage from "../../Images/slider1.jpg";

const CategorySection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories = [] } = useSelector((state) => state.category || {});
  const { allProducts = [] } = useSelector((state) => state.products || {});
  const { user: currentUser, isAuthenticated, cart = [] } = useSelector(
    (state) => state.auth
  );
  const { loading: userLoading } = useSelector((state) => state.user);

  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [addStatus, setAddStatus] = useState({});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategoryId(categories[0]._id);
      dispatch(getProductsByCategory(categories[0]._id));
    }
  }, [categories, dispatch]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategoryId(categoryId);
    dispatch(getProductsByCategory(categoryId));
  };

  const filteredProducts = allProducts.slice(0, 5);

  // find quantity of product in cart or 0
  const getProductQuantity = (productId) => {
    if (!cart) return 0;
    const cartItem = cart.find((item) => item.productId === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated || !currentUser) {
      alert("Please login to add items to cart");
      return;
    }
    setAddStatus((prev) => ({ ...prev, [productId]: "loading" }));
    try {
      await dispatch(
        addToCart({ userId: currentUser._id, productId, quantity: 1 })
      ).unwrap();
      setAddStatus((prev) => ({ ...prev, [productId]: "success" }));
      setTimeout(() => {
        setAddStatus((prev) => ({ ...prev, [productId]: null }));
      }, 1500);
    } catch (error) {
      setAddStatus((prev) => ({ ...prev, [productId]: "error" }));
    }
  };

  const handleQuantityChange = async (productId, type) => {
    if (!currentUser) return;
    const currentQuantity = getProductQuantity(productId);
    let newQuantity = type === "increase" ? currentQuantity + 1 : currentQuantity - 1;
    if (newQuantity < 1) newQuantity = 1;

    setAddStatus((prev) => ({ ...prev, [productId]: "loading" }));
    try {
      await dispatch(
        addToCart({ userId: currentUser._id, productId, quantity: newQuantity })
      ).unwrap();
      setAddStatus((prev) => ({ ...prev, [productId]: "success" }));
      setTimeout(() => {
        setAddStatus((prev) => ({ ...prev, [productId]: null }));
      }, 1500);
    } catch (error) {
      setAddStatus((prev) => ({ ...prev, [productId]: "error" }));
    }
  };

  const handleViewMore = () => {
    const activeCat = categories.find((c) => c._id === activeCategoryId);
    if (activeCat) {
      navigate(`/category?type=${encodeURIComponent(activeCat.name)}`);
    }
  };

  return (
    <div className="category-section">
      <p className="subtitle">Gifts For Your Special Ones</p>
      <h2 className="title">Explore Other Categories</h2>

      <div className="tabs">
        {categories.map((cat) => (
          <button
            key={cat._id}
            className={activeCategoryId === cat._id ? "tab active" : "tab"}
            onClick={() => handleCategoryChange(cat._id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => {
          const quantity = getProductQuantity(product._id);
          return (
            <div className="product-card" key={product._id}>
              <img
                src={
                  product.images?.[0]
                    ? `http://localhost:4001${product.images[0]}`
                    : sampleImage
                }
                alt={product.name}
                className="product-img"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>
                  Starting From{" "}
                  {product.size && product.size.length > 0
                    ? product.size[0].price
                    : "N/A"}
                  /-
                </p>
                {quantity > 0 ? (
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(product._id, "decrease")}
                      disabled={userLoading}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(product._id, "increase")}
                      disabled={userLoading}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-btn"
                    onClick={() => handleAddToCart(product._id)}
                    disabled={
                      addStatus[product._id] === "loading" || userLoading
                    }
                  >
                    {addStatus[product._id] === "loading"
                      ? "Adding..."
                      : addStatus[product._id] === "success"
                      ? "Added"
                      : "Add"}
                  </button>
                )}
                {addStatus[product._id] === "error" && (
                  <p className="add-error">Failed to update cart</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="view-more-container">
        <button className="view-more-btn" onClick={handleViewMore}>
          View More
        </button>
      </div>
    </div>
  );
};

export default CategorySection;
