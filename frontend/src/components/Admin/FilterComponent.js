import React from "react";
import "./FilterComponent.css";
import { FiX } from "react-icons/fi";

const FilterComponent = ({ onClose }) => {
  return (
    <div className="filter-popup-container">
      <div className="filter-popup">
        
        <div className="filter-section">
        <button className="close-button" onClick={onClose}>
          <FiX />
        </button>
          <h3 className="filter-title">Products</h3>
          <div className="filter-options">
            <div className="filter-row">
              <div className="filter-item"><span>Fisbbbbbbbh</span> <input type="checkbox" className="checkbox-large2" /></div>
              <div className="filter-item"><span>Chicken</span> <input type="checkbox" className="checkbox-large2" /></div>
              <div className="filter-item"><span>Muttobbbbbbbbn</span> <input type="checkbox" className="checkbox-large2" /></div>
            </div>
            <div className="filter-row">
              <div className="filter-item"><span>Crab</span> <input type="checkbox" className="checkbox-large2" /></div>
              <div className="filter-item"><span>Prawbbbbns</span> <input type="checkbox" className="checkbox-large2" /></div>
              <div className="filter-item"><span>Lobbster</span> <input type="checkbox" className="checkbox-large2" /></div>
            </div>
            <div className="filter-row">
              <div className="filter-item"><span>Crab</span> <input type="checkbox" className="checkbox-large2" /></div>
              <div className="filter-item"><span>Prawns</span> <input type="checkbox" className="checkbox-large2" /></div>
              <div className="filter-item"><span>Lobster</span> <input type="checkbox" className="checkbox-large2" /></div>
            </div>
            <div className="filter-row">
              <div className="filter-item"><span>Crab</span> <input type="checkbox" className="checkbox-large2" /></div>
              <div className="filter-item"><span>Prawns</span> <input type="checkbox" className="checkbox-large2" /></div>
              <div className="filter-item"><span>Lobster</span> <input type="checkbox" className="checkbox-large2" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;