import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import PincodePopup from '../../components/home/PincodePopup';
import SignInPopup from '../auth/SignInPopup';
import SignUpPopup from '../auth/SignUpPopup';
import downArrow from "../../Images/angle-down.png";
import pinIcon from '../../Images/Vector (10).png';
import cartIcon from '../../Images/shopping-bag-02-stroke-rounded 1.png';
import menuIcon from '../../Images/Menu-Icon.png';
import logoImage from '../../Images/WhatsApp Image 2024-11-27 at 18.39.53_5f47cead 1.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/Auth/AuthSlice';

const Navbar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPincode, setShowPincode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const menuButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("Auth State in Navbar:", useSelector((state) => state.auth));
  

  const switchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const switchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      setShowDropdown(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

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
          <Link to="/" className="logo">
            <img src={logoImage} alt="La Scorch Logo" className="logo-img" />
          </Link>
        </div>

        <div className="nav-buttons">
          <button className="icon-btn">
            <img src={cartIcon} alt="Cart" className="nav-icon" />
          </button>

          <button className="icon-btn" ref={menuButtonRef} onClick={() => setShowDropdown(prev => !prev)}>
            <img src={menuIcon} alt="User/Cake" className="nav-icon" />
          </button>

          {isAuthenticated ? (
            <button className="nav-login-btn" onClick={handleLogout}>Log Out</button>
          ) : (
            <button className="nav-login-btn" onClick={() => setShowSignIn(true)}>Log In</button>
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="user-dropdown" ref={dropdownRef}>
          <div className="user-item" onClick={() => { setShowDropdown(false); navigate('/my-account'); }}>My Profile</div>
          <div className="user-item" onClick={() => { setShowDropdown(false); navigate('/my-orders'); }}>My Orders</div>
          <div className="user-item" onClick={() => { setShowDropdown(false); navigate('/articles'); }}>Blogs</div>
          <div className="user-item" onClick={() => { setShowDropdown(false); navigate('/contact-us'); }}>Contact Us</div>
          <div className="user-item" onClick={() => {
            setShowDropdown(false);
            if (location.pathname === '/') {
              const section = document.getElementById('feedback');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigate('/', { state: { scrollTo: 'feedback' } });
            }
          }}>Give Feedback</div>
          {isAuthenticated && (
            <div className="user-item" onClick={handleLogout}>Log Out</div>
          )}
        </div>
      )}

      {/* Popups */}
      {showSignIn && <SignInPopup onClose={() => setShowSignIn(false)} onSwitch={switchToSignUp} />}
      {showSignUp && <SignUpPopup onClose={() => setShowSignUp(false)} onSwitch={switchToSignIn} />}
      {showPincode && <PincodePopup onClose={() => setShowPincode(false)} />}
    </>
  );
};

export default Navbar;
