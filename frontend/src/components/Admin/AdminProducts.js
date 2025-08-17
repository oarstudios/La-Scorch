import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiFilter } from "react-icons/fi";
import { FaArchive } from "react-icons/fa";
import "./AdminProducts.css";
import productImage1 from "../../Images/slider1.jpg";
import FilterComponent from "./FilterComponent";

const products = [
  {
    id: 1,
    name: "Triple Chocolate Cheesecake",
    price: "200",
    image: productImage1,
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Strawberry Chocolate",
    price: "600",
    image: productImage1,
  },
  {
    id: 3,
    name: "Chocolate Mousse",
    price: "800",
    image: productImage1,
  },
  {
    id: 4,
    name: "Vanilla Delight",
    price: "500",
    image: productImage1,
    tag: "New",
  },
  {
    id: 5,
    name: "Red Velvet Cake",
    price: "700",
    image: productImage1,
  },
];

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 50;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="admin-prod-wrapper">
      <div className="admin-prod-header">
        <div className="admin-prod-search">
          <FiSearch className="admin-prod-search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="admin-prod-actions">
          <button className="admin-prod-btn archive-btn">
            <FaArchive />
            Archive
          </button>
          <button className="admin-prod-btn filter-btn" onClick={() => setIsFilterOpen(true)}>
            <FiFilter />
            Filter
          </button>
        </div>
      </div>

      {isFilterOpen && <FilterComponent onClose={() => setIsFilterOpen(false)} />}

      <div className="admin-prod-grid">
        <Link to="/admin/add-product" className="admin-prod-card add-new-card">
          + Add New Product
        </Link>

        {displayedProducts.map((product) => (
          <div className="admin-prod-card" key={product.id}>
            <img src={product.image} alt={product.name} className="admin-prod-img" />
            <div className="admin-prod-info">
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <Link to="/admin/edit-product">
                <button className="admin-prod-edit-btn">Edit</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
