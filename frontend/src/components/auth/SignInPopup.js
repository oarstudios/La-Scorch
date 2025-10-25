import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AuthPopup.css';
import googleIcon from '../../Images/google-stroke-rounded 1.png';
import emailIcon from '../../Images/mail-01-stroke-rounded 1.png';
import passwordIcon from '../../Images/lock-password-stroke-rounded 1.png';
import eyeIcon from '../../Images/view.png';
import eyeOffIcon from '../../Images/view.png';

// ✅ import login thunk
import { loginUser } from '../../features/Auth/AuthSlice';
import USER_TYPES from '../../constants/userTypes';

const SignInPopup = ({ onClose, onSwitch }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        email: formData.email,
        password: formData.password,
        userType: USER_TYPES.USER, // or dynamically choose
      })
    )
      .unwrap()
      .then(() => {
        alert('Login Successful 🎉');
        onClose();
      })
      .catch((err) => {
        console.error(err);
        alert('Login Failed ❌ ' + err);
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box-user">
        <button className="popup-close" onClick={onClose}>×</button>
        <h2 className="popup-title-user">Sign in</h2>

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
          <form onSubmit={handleSubmit}>
            <button className="back-btn" onClick={() => setShowEmailForm(false)} type="button">
              ← Back
            </button>

            <div className="input-wrapper-user">
              <img src={emailIcon} alt="Email" className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email ID"
                className="input-field"
                value={formData.email}
                onChange={handleInputs}
                required
              />
            </div>

            <div className="input-wrapper-user password-wrapper">
              <img src={passwordIcon} alt="Password" className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter Your Password"
                className="input-field"
                value={formData.password}
                onChange={handleInputs}
                required
              />
              <img
                src={showPassword ? eyeOffIcon : eyeIcon}
                alt="Toggle Password"
                className="eye-icon"
                onClick={togglePassword}
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging In...' : 'Log In'}
            </button>

            {error && <p className="error-text">{error}</p>}
          </form>
        )}

        <p className="toggle-text">
          Don’t have an account? <span className="link" onClick={onSwitch}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default SignInPopup;
