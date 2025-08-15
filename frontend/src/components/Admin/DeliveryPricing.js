import React, { useState } from "react";
import "./DeliveryPricing.css";
import { FiSearch } from "react-icons/fi";

const DeliveryPricing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deliveryAreas, setDeliveryAreas] = useState([
    { id: 1, pincode: "400001", name: "Andheri, Mumbai", charges: 170, enabled: false, readonly: true },
    { id: 2, pincode: "400001", name: "Andheri, Mumbai", charges: 170, enabled: false, readonly: true },
  ]);

  const toggleEnable = (id) => {
    setDeliveryAreas((prevAreas) =>
      prevAreas.map((area) =>
        area.id === id ? { ...area, enabled: !area.enabled } : area
      )
    );
  };

  const toggleEditMode = (id) => {
    setDeliveryAreas((prevAreas) =>
      prevAreas.map((area) =>
        area.id === id ? { ...area, readonly: !area.readonly } : area
      )
    );
  };

  const handleChange = (id, field, value) => {
    setDeliveryAreas((prevAreas) =>
      prevAreas.map((area) =>
        area.id === id ? { ...area, [field]: value } : area
      )
    );
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const addNewEntry = () => {
    setDeliveryAreas((prevAreas) => [
      ...prevAreas,
      { id: prevAreas.length + 1, pincode: "", name: "", charges: "", enabled: false, readonly: false },
    ]);
  };

  return (
    <div className="delivery-pricing-container">
      <div className="admin-products-header lsp">
        <div className="admin-prod-search">
          <FiSearch className="admin-prod-search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="table-responsive">
        <button className="add-button-delivery" onClick={addNewEntry}>Add</button>
        <table className="delivery-pricing-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>PINCODE</th>
              <th>NAME</th>
              <th>DELIVERY CHARGES</th>
              <th>ENABLE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {deliveryAreas.map((area, index) => (
              <tr key={area.id} className="delivery-row">
                <td data-label="#">{index + 1}</td>
                <td data-label="PINCODE">
                  <input
                    type="text"
                    value={area.pincode}
                    placeholder={area.readonly ? "" : "Enter pincode"}
                    className={area.readonly ? "pincode-field readonly" : "pincode-field"}
                    onChange={(e) => handleChange(area.id, "pincode", e.target.value)}
                    readOnly={area.readonly}
                  />
                </td>
                <td data-label="NAME">
                  <input
                    type="text"
                    value={area.name}
                    placeholder={area.readonly ? "" : "Enter area name"}
                    className={area.readonly ? "name-field readonly" : "name-field"}
                    onChange={(e) => handleChange(area.id, "name", e.target.value)}
                    readOnly={area.readonly}
                  />
                </td>
                <td data-label="DELIVERY CHARGES">
                  <input
                    type="number"
                    value={area.charges}
                    placeholder={area.readonly ? "" : "Enter charges"}
                    className={area.readonly ? "charges-field readonly" : "charges-field"}
                    onChange={(e) => handleChange(area.id, "charges", e.target.value)}
                    readOnly={area.readonly}
                  />
                </td>
                <td data-label="ENABLE">
                  <input
                    type="checkbox"
                    checked={area.enabled}
                    onChange={() => toggleEnable(area.id)}
                    className="checkbox-large"
                    disabled={area.readonly}
                  />
                </td>
                <td>
                  <button className="edit-btn2" onClick={() => toggleEditMode(area.id)}>
                    {area.readonly ? "EDIT" : "SAVE"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryPricing;
