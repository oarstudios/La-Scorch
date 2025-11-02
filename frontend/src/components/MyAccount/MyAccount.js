import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '../../Images/pen.png';
import DeleteIcon from '../../Images/del.png';
import './MyAccount.css';

import { updateUser, deleteAddress } from '../../features/Users/UserSlice';
import { getCurrentUser } from '../../features/Auth/AuthSlice';

const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user || state.user.currentUser);

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
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);

  useEffect(() => {
    if (user && isEditing && editingAddressIndex !== null) {
      const addr = user.addresses?.[editingAddressIndex];
      if (addr) {
        setFormData({
          address: addr.address || '',
          landmark: addr.landmark || '',
          state: addr.state || '',
          city: addr.city || '',
          pincode: addr.pincode || '',
          phone: addr.phoneNo || ''
        });
        setAddressType(addr.tag || 'Home');
      }
    } else if (user && !isEditing) {
      setFormData({
        address: '',
        landmark: '',
        state: '',
        city: '',
        pincode: '',
        phone: ''
      });
      setAddressType('Home');
    }
  }, [user, isEditing, editingAddressIndex]);

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressTypeChange = (type) => {
    setAddressType(type);
  };

  const handleEditClick = (index) => {
    setIsEditing(true);
    setEditingAddressIndex(index);
    setShowPopup(true);
  };

  const handleAddAddress = () => {
    setIsEditing(false);
    setEditingAddressIndex(null);
    setShowPopup(true);
  };

  const validateForm = () => {
    return formData.address.trim() !== '' && formData.city.trim() !== '';
  };

  const handleUpdate = () => {
    if (!validateForm()) {
      alert('Please fill required fields.');
      return;
    }

    let updatedAddresses = [];

    if (isEditing && editingAddressIndex !== null) {
      updatedAddresses = user.addresses.map((addr, index) =>
        index === editingAddressIndex
          ? {
              ...addr,
              address: formData.address,
              landmark: formData.landmark,
              state: formData.state,
              city: formData.city,
              pincode: formData.pincode,
              phoneNo: formData.phone,
              tag: addressType
            }
          : addr
      );
    } else {
      updatedAddresses = user.addresses ? [...user.addresses] : [];
      if (updatedAddresses.length >= 3) {
        alert('Maximum of 3 addresses allowed.');
        return;
      }
      updatedAddresses.push({
        address: formData.address,
        landmark: formData.landmark,
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
        phoneNo: formData.phone,
        tag: addressType
      });
    }

    const updatedUser = {
      ...user,
      addresses: updatedAddresses
    };

    dispatch(updateUser({ id: user._id, userData: updatedUser }))
      .unwrap()
      .then(() => {
        alert(isEditing ? 'Address updated successfully!' : 'Address added successfully!');
        setShowPopup(false);
      })
      .catch(err => alert(err || 'Something went wrong'));
  };

  const handleDeleteClick = (index) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      dispatch(deleteAddress({ id: user._id, addressIndex: index }))
        .unwrap()
        .then(() => alert('Address deleted successfully!'))
        .catch(err => alert(err || 'Delete failed'));
    }
  };

  return (
    <div className="account-wrapper">
      <div className="left-content">
        <p className="back-text" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>← Back</p>
        <h1 className="heading">My Account</h1>

        <section className="section">
          <h2 className="section-heading">Basic Information</h2>
          <div className="input-group-row">
            <input type="text" placeholder="Name" value={user?.username || ''} readOnly />
            <input type="text" placeholder="Age" value={user?.age || ''} readOnly />
          </div>
          <input type="email" placeholder="Enter Your Email ID" value={user?.email || ''} readOnly />
        </section>

        <h2 className="section-heading">Saved Addresses</h2>
        {user && user.addresses && user.addresses.length > 0 ? (
          <>
            {user.addresses.map((addr, index) => (
              <div className="address-card" key={index}>
                <div className="address-header">
                  <h3>{addr.tag || 'Home'}</h3>
                  <div className="icons">
                    <img src={EditIcon} alt="Edit" className="icon" onClick={() => handleEditClick(index)} />
                    <img src={DeleteIcon} alt="Delete" className="icon" onClick={() => handleDeleteClick(index)} />
                  </div>
                </div>
                <p className="address-header-p">
                  {addr.address}, {addr.landmark}, {addr.city}, {addr.state} ({addr.pincode})
                </p>
                <p className="phone">Phone Number: +91 {addr.phoneNo}</p>
              </div>
            ))}
            {user.addresses.length < 3 && (
              <button className="update-btn" onClick={handleAddAddress}>Add Address</button>
            )}
          </>
        ) : (
          <div>
            <p>No saved address found.</p>
            <button className="update-btn" onClick={handleAddAddress}>Add Address</button>
          </div>
        )}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close" onClick={() => setShowPopup(false)}>×</button>
            <h2>{isEditing ? 'Edit Address' : 'Add Address'}</h2>

            <div className="radio-group">
              {['Home', 'Work', 'Other'].map((type) => (
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

            <button className="update-btn" onClick={handleUpdate}>{isEditing ? 'Update' : 'Add'}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
