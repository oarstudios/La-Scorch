import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiFilter } from "react-icons/fi";
import { FaArchive } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/Products/ProductSlice";
import FilterComponent from "./FilterComponent";
import productImage1 from "../../Images/slider1.jpg";
import "./AdminProducts.css";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { allProducts: products = [], loading, error } = useSelector(
    (state) => state.products
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const productsPerPage = 50;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Search handler resets to first page on change
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  // Filter and search products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Pagination controls
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="p-6 text-center">Loading products...</div>;
  }
  if (error) {
    return (
      <div className="p-6 text-center text-red-500">Error: {error}</div>
    );
  }

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
          <button
            className="admin-prod-btn filter-btn"
            onClick={() => setIsFilterOpen(true)}
          >
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
          <div className="admin-prod-card" key={product._id}>
            <img
              src={
                product.images?.[0]
                  ? `http://localhost:4001${product.images[0]}`
                  : productImage1
              }
              alt={product.name}
              className="admin-prod-img"
            />
            <div className="admin-prod-info">
              <h3>{product.name}</h3>
              <p>₹{product.size?.[0]?.price || "—"}</p>
              <Link to={`/admin/edit-product?id=${product._id}`}>
                <button className="admin-prod-edit-btn">Edit</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Previous
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={pageNum === currentPage ? "active" : ""}
              >
                {pageNum}
              </button>
            );
          })}

          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
