import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/Categories/CategorySlice";
import { getProductsByCategory } from "../../features/Products/ProductSlice";
import sampleImage from "../../Images/slider1.jpg";
import searchIcon from "../../Images/Search.png";
import "./FullCategoryPage.css";

const FullCategoryPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Redux category and products state selectors
  const { categories = [] } = useSelector((state) => state.category || {});
  const { allProducts = [], loading, error } = useSelector(
    (state) => state.products || {}
  );

  const [searchTerm, setSearchTerm] = useState("");

  // Parse category name from query
  const query = new URLSearchParams(location.search);
  const categoryName = query.get("type") || "";

  // Find category matching this name (case-insensitive)
  const category = categories.find(
    (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
  );

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // When categories or category changes, fetch products for that category
  useEffect(() => {
    if (category) {
      dispatch(getProductsByCategory(category._id));
    }
  }, [category, dispatch]);

  // Filter products based on search term (case-insensitive)
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="full-category-section">
      <div className="full-category-header">
        <div>
          <p className="subtitle-allCAt">Gifts For Your Special Ones</p>
          <h2 className="title-allCAt">Explore More In {categoryName}</h2>
        </div>
        <div className="search-bar-user">
          <img src={searchIcon} alt="Search Icon" />
          <input
            type="text"
            placeholder={`Search For ${categoryName}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      <div className="products-grid">
        {filteredProducts.length === 0 && !loading ? (
          <p>No products found in this category.</p>
        ) : (
          filteredProducts.map((product) => (
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
                  Starting from{" "}
                  {product.size && product.size.length > 0
                    ? product.size[0].price
                    : "N/A"}
                  /-
                </p>
                <button className="add-btn">Add</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FullCategoryPage;
