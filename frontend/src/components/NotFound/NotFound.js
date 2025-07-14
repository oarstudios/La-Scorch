import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';
import cakeNotFound from '../../Images/404.png'; // Replace with your actual path

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <img src={cakeNotFound} alt="cake not found" className="notfound-image" />
      <h2 className="notfound-heading">Oops! the piece of the cake not found</h2>
      <p className="notfound-subtext">You searched the wrong page, go back to home</p>
      <button className="notfound-button" onClick={() => navigate('/')}>
        Home
      </button>
    </div>
  );
};

export default NotFound;
