import React, { useState } from 'react';
import './PincodePopup.css';

const PincodePopup = ({ onClose }) => {
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null); // "success" | "error"

  const serviceablePincodes = ['400001', '401501', '400604', '110001'];

  const handleCheck = () => {
    if (pincode.length !== 6 || isNaN(pincode)) {
      setMessage('Please enter a valid 6-digit pincode');
      setStatus('error');
      return;
    }

    if (serviceablePincodes.includes(pincode)) {
      setMessage("🎉 Awesome! We serve in your city.");
      setStatus('success');
    } else {
      setMessage("😔 Sorry, we don't deliver to this area yet. But we’re baking plans to get there soon!");
      setStatus('error');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box pincode-box">
        <h2 className="popup-title">Enter Pincode</h2>

        <div className="input-wrapper-pincode">
          <input
            type="text"
            placeholder="Enter 6 Digit Pincode"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="input-field-pincode"
          />
        </div>

        <button className="confirm-btn" onClick={handleCheck}>Confirm</button>

        {message && (
          <div className={`message ${status}`}>
            <span>{message}</span>
          </div>
        )}

        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default PincodePopup;
