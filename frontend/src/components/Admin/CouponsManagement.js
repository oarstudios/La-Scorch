import React, { useEffect, useState } from "react";
import "./CouponsManagement.css";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from "../../features/Coupons/CouponsSlice";

const CouponsManagement = () => {
  const dispatch = useDispatch();
  const { coupons, loading, error } = useSelector((state) => state.coupons);

  const [searchQuery, setSearchQuery] = useState("");
  const [localCoupons, setLocalCoupons] = useState([]);

  useEffect(() => {
    dispatch(fetchCoupons(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    setLocalCoupons(
      coupons.map((c, i) => ({
        ...c,
        id: c._id || i + 1,
        readonly: true,
        isNew: false,
      }))
    );
  }, [coupons]);

  const handleSearch = (event) => setSearchQuery(event.target.value);

  const addNewEntry = () => {
    setLocalCoupons((prev) => [
      ...prev,
      {
        id: Date.now(), // Unique temp id
        code: "",
        discount: "",
        enabled: false,
        readonly: false,
        isNew: true,
      },
    ]);
  };

  const toggleEnable = (id) => {
    setLocalCoupons((prev) =>
      prev.map((coupon) =>
        coupon.id === id
          ? { ...coupon, enabled: !coupon.enabled }
          : coupon
      )
    );
  };

  const toggleEditMode = async (id) => {
    const coupon = localCoupons.find((cp) => cp.id === id);

    if (coupon.readonly) {
      setLocalCoupons((prev) =>
        prev.map((cp) =>
          cp.id === id ? { ...cp, readonly: false } : cp
        )
      );
    } else {
      // Save (new or update). couponId never sent!
      if (coupon.isNew) {
        const res = await dispatch(
          createCoupon({
            code: coupon.code,
            discount: Number(coupon.discount),
            enabled: Boolean(coupon.enabled),
          })
        );
        if (!res.error) {
          dispatch(fetchCoupons(searchQuery));
        }
      } else if (coupon._id) {
        const res = await dispatch(
          updateCoupon({
            id: coupon._id,
            data: {
              code: coupon.code,
              discount: Number(coupon.discount),
              enabled: Boolean(coupon.enabled),
            },
          })
        );
        if (!res.error) {
          dispatch(fetchCoupons(searchQuery));
        }
      }
      setLocalCoupons((prev) =>
        prev.map((cp) =>
          cp.id === id ? { ...cp, readonly: true, isNew: false } : cp
        )
      );
    }
  };

  const handleChange = (id, field, value) => {
    setLocalCoupons((prev) =>
      prev.map((coupon) =>
        coupon.id === id ? { ...coupon, [field]: value } : coupon
      )
    );
  };

  const handleDelete = async (coupon) => {
    if (coupon.isNew) {
      setLocalCoupons((prev) => prev.filter((c) => c.id !== coupon.id));
      return;
    }
    await dispatch(deleteCoupon(coupon._id));
    dispatch(fetchCoupons(searchQuery));
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
            {localCoupons.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", opacity: 0.7 }}>
                  No coupons
                </td>
              </tr>
            ) : (
              localCoupons.map((coupon, index) => (
                <tr key={coupon.id} className="coupon-row">
                  <td data-label="#">{index + 1}</td>
                  <td data-label="COUPON ID">
                    <input
                      type="text"
                      value={coupon.couponId || ""}
                      readOnly
                      className="coupon-field readonly"
                      placeholder="(Auto)"
                    />
                  </td>
                  <td data-label="CODE">
                    <input
                      type="text"
                      value={coupon.code}
                      placeholder={coupon.readonly ? "" : "Enter code"}
                      className={coupon.readonly ? "coupon-field readonly" : "coupon-field"}
                      onChange={(e) =>
                        handleChange(coupon.id, "code", e.target.value)
                      }
                      readOnly={coupon.readonly}
                    />
                  </td>
                  <td data-label="DISCOUNT %">
                    <input
                      type="number"
                      value={coupon.discount}
                      placeholder={coupon.readonly ? "" : "Enter %"}
                      className={coupon.readonly ? "coupon-field readonly" : "coupon-field"}
                      onChange={(e) =>
                        handleChange(coupon.id, "discount", e.target.value)
                      }
                      readOnly={coupon.readonly}
                    />
                  </td>
                  <td data-label="ENABLE">
                    <input
                      type="checkbox"
                      checked={!!coupon.enabled}
                      onChange={() => toggleEnable(coupon.id)}
                      className="checkbox-large"
                      disabled={coupon.readonly}
                    />
                  </td>
                  <td>
                    <button
                      className="edit-btn2"
                      onClick={() => toggleEditMode(coupon.id)}
                    >
                      {coupon.readonly ? "EDIT" : "SAVE"}
                    </button>
                    {!coupon.readonly && (
                      <button
                        className="edit-btn2"
                        style={{ marginLeft: 8, background: "#FE4A49", color: "#fff" }}
                        onClick={() => handleDelete(coupon)}
                      >
                        DELETE
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {loading && <div>Loading...</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default CouponsManagement;
