import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBestsellerProducts } from "../../features/Products/ProductSlice";
import "./BestSellerSection.css";
import sampleImage from "../../Images/slider1.jpg";

const BestSellerSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bestsellerProducts = [], loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getBestsellerProducts());
  }, [dispatch]);

  const handleClick = (product) => {
    navigate("/product", { state: product });
  };

  if (loading) return <p>Loading bestsellers...</p>;
  if (error) return <p>Error loading bestsellers: {error}</p>;

  return (
    <div className="best-seller-section">
      <p className="subtitle">Gifts For Your Special Ones</p>
      <h2 className="title">Best Selling Varieties</h2>

      <div className="products-grid">
        {bestsellerProducts.length === 0 && <p>No bestseller products found.</p>}

        {bestsellerProducts.map((product) => (
          <div
            className="product-card"
            key={product._id}
            onClick={() => handleClick(product)}
          >
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
              <button className="add-btn">Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellerSection;
