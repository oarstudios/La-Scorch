import React, { useState } from 'react';
import './Navbar.css';
import PincodePopup from '../../components/home/PincodePopup';
import SignInPopup from '../auth/SignInPopup';
import SignUpPopup from '../auth/SignUpPopup';
import downArrow from "../../Images/angle-down.png"
import pinIcon from '../../Images/Vector (5).png';         // 📍 replace with your pincode vector
import cartIcon from '../../Images/shopping-bag-02-stroke-rounded 1.png';       // 🛒 replace with your cart vector
import menuIcon from '../../Images/Menu-Icon.png';       // 🎂 replace with your cake/user vector
import logoImage from '../../Images/WhatsApp Image 2024-11-27 at 18.39.53_5f47cead 1.png';           // 🖼️ actual logo image of "La Scorch"

const Navbar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPincode, setShowPincode] = useState(false);

  const switchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const switchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  return (
    <>
      <div className="top-bar">
        All Cakes are 100% Egg less and Refined Flour Free!
      </div>

      <div className="main-navbar">
<div className="location" onClick={() => setShowPincode(true)}>
  <img src={pinIcon} alt="Pin" className="location-icon" />
  <div>
    <div className="pin-row">
      <div className="pin-code">401 501</div>
      <img src={downArrow} alt="Down Arrow" className="down-arrow" />
    </div>
    <div className="location-text">Mumbai, India</div>
  </div>
</div>



        <div className="logo">
          <img src={logoImage} alt="La Scorch Logo" className="logo-img" />
        </div>

        <div className="nav-buttons">
          <button className="icon-btn">
            <img src={cartIcon} alt="Cart" className="nav-icon" />
          </button>
          <button className="icon-btn">
            <img src={menuIcon} alt="User/Cake" className="nav-icon" />
          </button>
          <button className="nav-login-btn" onClick={() => setShowSignIn(true)}>Log In</button>
        </div>
      </div>

      {showSignIn && <SignInPopup onClose={() => setShowSignIn(false)} onSwitch={switchToSignUp} />}
      {showSignUp && <SignUpPopup onClose={() => setShowSignUp(false)} onSwitch={switchToSignIn} />}
        {showPincode && <PincodePopup onClose={() => setShowPincode(false)} />}

    </>
  );
};

export default Navbar;
