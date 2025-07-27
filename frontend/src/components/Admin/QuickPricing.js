import React, { useState } from "react";
import "./QuickPricing.css";
import { FiSearch, FiFilter } from "react-icons/fi";
import { FaArchive } from "react-icons/fa";
import FilterComponent from "./FilterComponent";
import img1 from "../../Images/slider1.jpg";

const QuickPricing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      image: img1,
      name: "Bombay Duck Fish/ Bombil Fish",
      weight: "1000g",
      salePrice: 570,
      maxPrice: 900,
      bestseller: false,
      isEditing: false,
    },
    {
      id: 2,
      image: img1,
      name: "Bombay Duck Fish/ Bombil Fish",
      weight: "1000g",
      salePrice: 50,
      maxPrice: 900,
      bestseller: false,
      isEditing: false,
    },
  ]);

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleEditMode = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, isEditing: !product.isEditing }
          : product
      )
    );
  };

  const handlePriceChange = (id, newPrice) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, salePrice: newPrice } : product
      )
    );
  };

  const toggleBestseller = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, bestseller: !product.bestseller }
          : product
      )
    );
  };

  return (
    <div className="quick-pricing-container">
      <div className="admin-products-header lsp">
        {/* <button className="back-button">Back</button> */}

         <div className="admin-prod-search">
                        <FiSearch className="admin-prod-search-icon" />
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={handleSearch}
                        />
                      </div>

        <div className="admin-icons">
          <button className="admin-prod-btn filter-btn" onClick={() => setIsFilterOpen(true)}>
                      <FiFilter />
                      Filter
                    </button>
        </div>
      </div>
      {filterVisible && <FilterComponent onClose={toggleFilter} />}
      <table className="quick-pricing-table">
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>WEIGHT</th>
            <th>SALE PRICE</th>
            <th>FISH OF THE DAY</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="QP-product-info">
                <img
                  src={product.image}
                  alt={product.name}
                  className="QP-product-image"
                />
                <span className="QP-product-name">{product.name}</span>
              </td>
              <td className="QP-product-weight">{product.weight}</td>
              <td className="QP-product-price">
                <div className="price-box">
                  <span className="currency-symbol">₹</span>
                  <input
                    type="number"
                    value={product.salePrice}
                    onChange={(e) =>
                      handlePriceChange(product.id, e.target.value)
                    }
                    className="price-input"
                    disabled={!product.isEditing}
                  />
                  <button
                    className={`edit-btn ${
                      product.isEditing ? "apply-btn" : ""
                    }`}
                    onClick={() => toggleEditMode(product.id)}
                  >
                    {product.isEditing ? "APPLY" : "EDIT"}
                  </button>
                </div>
                <p className="max-price">MAX: ₹{product.maxPrice}</p>
              </td>
              <td className="bestseller-checkbox">
                <span className="fish-of-the-day">Fish of the Day:</span>
                <input
                  type="checkbox"
                  checked={product.bestseller}
                  onChange={() => toggleBestseller(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuickPricing;