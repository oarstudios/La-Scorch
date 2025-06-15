import React from 'react';
import './AuthPopup.css';
import googleIcon from '../../Images/google-stroke-rounded 1.png';

const SignInPopup = ({ onClose, onSwitch }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2 className="popup-title">Sign in</h2>

        <button className="google-btn">
          <img src={googleIcon} alt="Google" className="google-icon" />
          Sign up with Google
        </button>

        <div className="separator">or</div>

        <button className="email-btn">Continue With Email</button>

        <p className="toggle-text">
          Don’t have an account? <span className="link" onClick={onSwitch}>Sign up</span>
        </p>

        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default SignInPopup;
