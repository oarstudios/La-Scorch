import React, { useState } from 'react';
import './PincodePopup.css';

const PincodePopup = ({ onClose }) => {
  const [pincode, setPincode] = useState('');
  const [status, setStatus] = useState(null); // "success" | "error"

  const serviceablePincodes = ['400001', '401501', '400604', '110001'];

  const handleCheck = () => {
    if (pincode.length !== 6 || isNaN(pincode)) {
      setStatus('error');
      return;
    }

    if (serviceablePincodes.includes(pincode)) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box-user pincode-box">
         <button className="popup-close" onClick={onClose}>×</button>
        {/* TITLE */}
        {status === 'success' && (
          <h2 className="popup-title-pin" style={{ fontSize: '28px' }}>
            Awesome! We serve in your location.
          </h2>
        )}

        {status === 'error' && (
          <h2 className="popup-title-pin" style={{ fontSize: '28px' }}>
            Sorry, we do not deliver at your location. Try another pin code or explore page
          </h2>
        )}

        {status === null && (
          <h2 className="popup-title-pin">
            Check if we deliver at your location
          </h2>
        )}

        {/* INPUT */}
        <div className="input-wrapper-pincode">
          <input
            type="text"
            placeholder="Add Your Pincode Here"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="input-field-pincode"
          />
        </div>

        {/* BUTTONS */}
        {status === 'error' ? (
          <div className="error-btn-wrapper">
            <button className="confirm-btn" onClick={handleCheck}>Check</button>
            <button className="explore-btn" onClick={onClose}>Explore Page</button>
          </div>
        ) : (
          <button className="confirm-btn" onClick={handleCheck}>Check</button>
        )}

        {/* Close icon */}
       
      </div>
    </div>
  );
};

export default PincodePopup;
