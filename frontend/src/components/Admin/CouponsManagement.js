import React, { useState } from "react";
import "./CouponsManagement.css";
import { FiSearch } from "react-icons/fi";

const CouponsManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [coupons, setCoupons] = useState([
    { id: 1, couponId: "C001", code: "WELCOME10", discount: 10, enabled: true, readonly: true },
    { id: 2, couponId: "C002", code: "FREESHIP", discount: 0, enabled: false, readonly: true },
  ]);

  const toggleEnable = (id) => {
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon.id === id ? { ...coupon, enabled: !coupon.enabled } : coupon
      )
    );
  };

  const toggleEditMode = (id) => {
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon.id === id ? { ...coupon, readonly: !coupon.readonly } : coupon
      )
    );
  };

  const handleChange = (id, field, value) => {
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon.id === id ? { ...coupon, [field]: value } : coupon
      )
    );
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const addNewEntry = () => {
    setCoupons((prevCoupons) => [
      ...prevCoupons,
      {
        id: prevCoupons.length + 1,
        couponId: "",
        code: "",
        discount: "",
        enabled: false,
        readonly: false,
      },
    ]);
  };

  return (
    <div className="coupons-container">
      <div className="admin-products-header lsp">
        <div className="admin-prod-search">
          <FiSearch className="admin-prod-search-icon" />
          <input
            type="text"
            placeholder="Search coupons..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="table-responsive">
        <button className="add-button-coupons" onClick={addNewEntry}>
          Add
        </button>
        <table className="coupons-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>COUPON ID</th>
              <th>CODE</th>
              <th>DISCOUNT %</th>
              <th>ENABLE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon.id} className="coupon-row">
                <td data-label="#">{index + 1}</td>
                <td data-label="COUPON ID">
                  <input
                    type="text"
                    value={coupon.couponId}
                    placeholder={coupon.readonly ? "" : "Enter ID"}
                    className={coupon.readonly ? "coupon-field readonly" : "coupon-field"}
                    onChange={(e) => handleChange(coupon.id, "couponId", e.target.value)}
                    readOnly={coupon.readonly}
                  />
                </td>
                <td data-label="CODE">
                  <input
                    type="text"
                    value={coupon.code}
                    placeholder={coupon.readonly ? "" : "Enter code"}
                    className={coupon.readonly ? "coupon-field readonly" : "coupon-field"}
                    onChange={(e) => handleChange(coupon.id, "code", e.target.value)}
                    readOnly={coupon.readonly}
                  />
                </td>
                <td data-label="DISCOUNT %">
                  <input
                    type="number"
                    value={coupon.discount}
                    placeholder={coupon.readonly ? "" : "Enter %"}
                    className={coupon.readonly ? "coupon-field readonly" : "coupon-field"}
                    onChange={(e) => handleChange(coupon.id, "discount", e.target.value)}
                    readOnly={coupon.readonly}
                  />
                </td>
                <td data-label="ENABLE">
                  <input
                    type="checkbox"
                    checked={coupon.enabled}
                    onChange={() => toggleEnable(coupon.id)}
                    className="checkbox-large"
                    disabled={coupon.readonly}
                  />
                </td>
                <td>
                  <button className="edit-btn2" onClick={() => toggleEditMode(coupon.id)}>
                    {coupon.readonly ? "EDIT" : "SAVE"}
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

export default CouponsManagement;
