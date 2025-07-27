import React, { useState } from 'react';
import './AuthPopup.css';
import googleIcon from '../../Images/google-stroke-rounded 1.png';
import emailIcon from '../../Images/mail-01-stroke-rounded 1.png';
import passwordIcon from '../../Images/lock-password-stroke-rounded 1.png';
import eyeIcon from '../../Images/view.png';
import eyeOffIcon from '../../Images/view.png';

const SignInPopup = ({ onClose, onSwitch }) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="popup-overlay">
      <div className="popup-box">
         <button className="popup-close" onClick={onClose}>×</button>
        <h2 className="popup-title">Sign in</h2>

        {!showEmailForm ? (
          <>
            <button className="google-btn">
              <img src={googleIcon} alt="Google" className="google-icon" />
              Sign in with Google
            </button>

            <div className="separator">or</div>

            <button className="email-btn" onClick={() => setShowEmailForm(true)}>
              Continue With Email
            </button>
          </>
        ) : (
          <>
            <button className="back-btn" onClick={() => setShowEmailForm(false)}>
              ← Back
            </button>

            <div className="input-wrapper">
              <img src={emailIcon} alt="Email" className="input-icon" />
              <input type="email" placeholder="Enter Your Email ID" className="input-field" />
            </div>

            <div className="input-wrapper password-wrapper">
              <img src={passwordIcon} alt="Password" className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Your Password"
                className="input-field"
              />
              <img
                src={showPassword ? eyeOffIcon : eyeIcon}
                alt="Toggle Password"
                className="eye-icon"
                onClick={togglePassword}
              />
            </div>

            <button className="login-btn">Log In</button>
          </>
        )}

        <p className="toggle-text">
          Don’t have an account? <span className="link" onClick={onSwitch}>Sign up</span>
        </p>

     
      </div>
    </div>
  );
};

export default SignInPopup;
