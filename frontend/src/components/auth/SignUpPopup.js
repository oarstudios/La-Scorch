import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AuthPopup.css";
import googleIcon from "../../Images/google-stroke-rounded 1.png";
import emailIcon from "../../Images/mail-01-stroke-rounded 1.png";
import passwordIcon from "../../Images/lock-password-stroke-rounded 1.png";
import eyeIcon from "../../Images/view.png"; 
import eyeOffIcon from "../../Images/view.png"; 

// ✅ import thunk
import { signupUser } from "../../features/Auth/AuthSlice";
import USER_TYPES from "../../constants/userTypes";

const SignUpPopup = ({ onClose, onSwitch }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ get redux state
  const { loading, error } = useSelector((state) => state.auth);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    dispatch(
      signupUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        userType: USER_TYPES.USER,
      })
    )
      .unwrap()
      .then(() => {
        alert("Signup Successful 🎉");
        onClose();
      })
      .catch((err) => {
        console.error(err);
        alert("Signup Failed ❌ " + err);
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box-user">
        <button className="popup-close" onClick={onClose}>
          ×
        </button>
        <h2 className="popup-title-user">Sign Up</h2>

        <button className="google-btn">
          <img src={googleIcon} alt="Google" className="google-icon" />
          Sign up with Google
        </button>

        <div className="separator">or sign in with email</div>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper-user">
            <img src={emailIcon} alt="User" className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Enter Your User Name"
              className="input-field"
              value={formData.username}
              onChange={handleInputs}
              required
            />
          </div>

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
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter New Password"
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

          <div className="input-wrapper-user password-wrapper">
            <img src={passwordIcon} alt="Password" className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm New Password"
              className="input-field"
              value={formData.confirmPassword}
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
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}

        <p className="toggle-text">
          Already have an account?{" "}
          <span className="link" onClick={onSwitch}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPopup;
