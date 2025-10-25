import React, { useEffect, useState } from "react";
import "./DeliveryPricing.css";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../../features/DeliveryPricing/DeliverySlice";

const DeliveryPricing = () => {
  const dispatch = useDispatch();
  const { locations, loading, error } = useSelector((state) => state.delivery);

  const [searchQuery, setSearchQuery] = useState("");
  const [localAreas, setLocalAreas] = useState([]);

  useEffect(() => {
    dispatch(fetchLocations(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    setLocalAreas(
      locations.map((a, i) => ({
        ...a,
        id: a._id || i + 1, // for stable keys
        charges: a.deliveryCharges || 0,
        readonly: true,
        isNew: false,
      }))
    );
  }, [locations]);

  const handleSearch = (event) => setSearchQuery(event.target.value);

  const addNewEntry = () => {
    setLocalAreas((prev) => [
      ...prev,
      {
        id: Date.now(),
        pincode: "",
        name: "",
        charges: 0,
        enabled: false,
        readonly: false,
        isNew: true,
      },
    ]);
  };

  const toggleEnable = (id) => {
    setLocalAreas((prev) =>
      prev.map((area) =>
        area.id === id
          ? { ...area, enabled: !area.enabled }
          : area
      )
    );
  };

  const toggleEditMode = async (id) => {
    const area = localAreas.find((ar) => ar.id === id);

    if (area.readonly) {
      setLocalAreas((prev) =>
        prev.map((ar) =>
          ar.id === id ? { ...ar, readonly: false } : ar
        )
      );
    } else {
      // Save (new or update)
      const data = {
        pincode: area.pincode,
        name: area.name,
        deliveryCharges: Number(area.charges),
        enabled: Boolean(area.enabled)
      };
      if (area.isNew) {
        const res = await dispatch(createLocation(data));
        if (!res.error) dispatch(fetchLocations(searchQuery));
      } else if (area._id) {
        const res = await dispatch(updateLocation({ id: area._id, data }));
        if (!res.error) dispatch(fetchLocations(searchQuery));
      }
      setLocalAreas((prev) =>
        prev.map((ar) =>
          ar.id === id ? { ...ar, readonly: true, isNew: false } : ar
        )
      );
    }
  };

  const handleChange = (id, field, value) => {
    setLocalAreas((prev) =>
      prev.map((area) =>
        area.id === id ? { ...area, [field]: value } : area
      )
    );
  };

  const handleDelete = async (area) => {
    if (area.isNew) {
      setLocalAreas((prev) => prev.filter((a) => a.id !== area.id));
      return;
    }
    await dispatch(deleteLocation(area._id));
    dispatch(fetchLocations(searchQuery));
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
            {localAreas.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", opacity: 0.7 }}>
                  No locations
                </td>
              </tr>
            ) : (
              localAreas.map((area, index) => (
                <tr key={area.id} className="delivery-row">
                  <td data-label="#">{index + 1}</td>
                  <td data-label="PINCODE">
                    <input
                      type="number"
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
                    {!area.readonly && (
                      <button
                        className="edit-btn2"
                        style={{ marginLeft: 8, background: "#FE4A49", color: "#fff" }}
                        onClick={() => handleDelete(area)}
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

export default DeliveryPricing;
