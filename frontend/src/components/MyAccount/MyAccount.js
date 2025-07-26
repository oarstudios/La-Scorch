import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './MyAccount.css';
import EditIcon from '../../Images/pen.png';
import DeleteIcon from '../../Images/del.png';

const MyAccount = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [addressType, setAddressType] = useState('Home');
  const [formData, setFormData] = useState({
    address: '',
    landmark: '',
    state: '',
    city: '',
    pincode: '',
    phone: ''
  });

  const handleEditClick = () => {
    setFormData({
      address: 'Yashwant Shrushti, 9/D/403, Navapur Naka, Boisar',
      landmark: 'Near Rahul International School',
      state: 'MH',
      city: 'Boisar',
      pincode: '401501',
      phone: '9373869224'
    });
    setAddressType('Home');
    setShowPopup(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAddressTypeChange = (type) => {
    setAddressType(type);
  };
      const navigate = useNavigate();

  return (
    <div className="account-wrapper">
      <div className="left-content">
         <p className="back-text" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>← Back</p>
        <h1 className="heading">My Account</h1>

        <section className="section">
          <h2 className="section-heading">Basic Information</h2>
          <div className="input-group-row">
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Age" />
          </div>
          <input type="email" placeholder="Enter Your Email ID" />
          <input type="tel" placeholder="Enter Your Phone Number" />
        </section>
        <h2 className="section-heading">Saved Address</h2>
        <div className="address-card">
          <div className="address-header">
            <h3>Home</h3>
            <div className="icons">
              <img src={EditIcon} alt="Edit" className="icon" onClick={handleEditClick} />
              <img src={DeleteIcon} alt="Delete" className="icon" />
            </div>
          </div>
          <p className="address-header-p">
            Yashwant Shrushti, 9/D/403, Navapur Naka, Boisar, Tarapur MIDC, Boisar, Maharashtra (401501)
          </p>
          <p className="phone">Phone Number: +91 9373869224</p>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Edit Address</h2>

            <div className="radio-group">
              {['Home', 'Work', 'Other'].map(type => (
                <label key={type} className={`radio-option ${addressType === type ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="addressType"
                    value={type}
                    checked={addressType === type}
                    onChange={() => handleAddressTypeChange(type)}
                  />
                  {type}
                </label>
              ))}
            </div>

            <label className="form-label">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter full address" />

            <label className="form-label">Landmark</label>
            <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} placeholder="Nearby landmark" />

            <div className="input-group-row">
              <div>
                <label className="form-label">State</label>
                <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" />
              </div>
              <div>
                <label className="form-label">City</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
              </div>
              <div>
                <label className="form-label">Pincode</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" />
              </div>
            </div>

            <label className="form-label">Phone Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" />

            <button className="update-btn">Update</button>
            <button className="close-btn" onClick={handleClosePopup}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
