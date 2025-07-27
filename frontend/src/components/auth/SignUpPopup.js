import React, { useState } from 'react';
import './AuthPopup.css';
import googleIcon from '../../Images/google-stroke-rounded 1.png';
import emailIcon from '../../Images/mail-01-stroke-rounded 1.png';
import passwordIcon from '../../Images/lock-password-stroke-rounded 1.png';
import eyeIcon from '../../Images/view.png';          // 👁️ open eye icon
import eyeOffIcon from '../../Images/view.png';   // 🙈 closed eye icon

const SignUpPopup = ({ onClose, onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="popup-overlay">
      <div className="popup-box">
         <button className="popup-close" onClick={onClose}>×</button>
        <h2 className="popup-title">Sign Up</h2>

        <button className="google-btn">
          <img src={googleIcon} alt="Google" className="google-icon" />
          Sign up with Google
        </button>

        <div className="separator">or sign in with email</div>

         <div className="input-wrapper">
          <img src={emailIcon} alt="Email" className="input-icon" />
          <input type="name" placeholder="Enter Your User Name" className="input-field" />
        </div>

        <div className="input-wrapper">
          <img src={emailIcon} alt="Email" className="input-icon" />
          <input type="email" placeholder="Enter Your Email ID" className="input-field" />
        </div>

        <div className="input-wrapper password-wrapper">
          <img src={passwordIcon} alt="Password" className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter New Password"
            className="input-field"
          />
          <img
            src={showPassword ? eyeOffIcon : eyeIcon}
            alt="Toggle Password"
            className="eye-icon"
            onClick={togglePassword}
          />
        </div>

        <div className="input-wrapper password-wrapper">
          <img src={passwordIcon} alt="Password" className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm New Password"
            className="input-field"
          />
          <img
            src={showPassword ? eyeOffIcon : eyeIcon}
            alt="Toggle Password"
            className="eye-icon"
            onClick={togglePassword}
          />
        </div>

        {/* <div className="reset-row">
          <span className="reset-password">Reset Password?</span>
        </div> */}

        <button className="login-btn">Log In</button>

        <p className="toggle-text">
          Already have an account? <span className="link" onClick={onSwitch}>Sign in</span>
        </p>

       
      </div>
    </div>
  );
};

export default SignUpPopup;
