import React, { useState } from 'react';
import './FeedbackSection.css';
import feedbackBox from '../../Images/May_14__2025__04_32_55_PM-removebg-preview 1.png';
import starFilled from '../../Images/star-filled.png';     // Provide filled star
import starUnfilled from '../../Images/star-unfilled.png'; // Provide unfilled star

const FeedbackSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = () => {
    console.log('Rating:', rating);
    console.log('Feedback:', feedbackText);
    // Optionally send to backend here
    setShowPopup(false);
    setRating(0);
    setFeedbackText('');
  };

  return (
    <>
      <section className="feedback-section">
        <div className="feedback-left">
          <h2>Listen what people say about our delicious cakes!</h2>
          <button className="feedback-btn" onClick={() => setShowPopup(true)}>Give Feedback</button>
        </div>
        <div className="feedback-right">
          <img src={feedbackBox} alt="Cake Feedback Box" className="feedback-img" />
        </div>
      </section>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="feedback-popup" onClick={(e) => e.stopPropagation()}>
            <h3 className="popup-title">Give Feedback</h3>
            <div className="ratestar">
               <p className="popup-label">Rate Us</p>
            <div className="popup-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <img
                  key={star}
                  src={hoverRating >= star || rating >= star ? starFilled : starUnfilled}
                  alt="star"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            </div>
           
            <textarea
              className="popup-textarea"
              placeholder="Let Us Know How Was Your Experience"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <button className="popup-submit" onClick={handleSubmit}>Submit Feedback</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackSection;
