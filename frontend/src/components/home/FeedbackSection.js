import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createFeedback, resetFeedbackState } from '../../features/Feedback/feedbackSlice';

import './FeedbackSection.css';
import feedbackBox from '../../Images/May_14__2025__04_32_55_PM-removebg-preview 1.png';
import starFilled from '../../Images/star-filled.png';
import starUnfilled from '../../Images/star-unfilled.png';

const FeedbackSection = ({ userId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.feedback);

  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async () => {
    setLocalError('');

    if (!userId) {
      setLocalError("User not authenticated");
      return;
    }
    if (rating < 1 || rating > 5) {
      setLocalError("Please select your rating.");
      return;
    }
    if (!feedbackText.trim()) {
      setLocalError("Please enter your feedback.");
      return;
    }

    try {
      await dispatch(createFeedback({ userId, rating, feedbackText })).unwrap();
      setShowPopup(false);
      setRating(0);
      setFeedbackText('');
      setLocalError('');
      dispatch(resetFeedbackState());
    } catch (err) {
      setLocalError(err || 'Could not submit feedback');
    }
  };

  return (
    <>
      <section className="feedback-section" id="feedback">
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
          <div className="feedback-popup" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)}>×</button>
            <h3 className="popup-title-user">Give Feedback</h3>
            <div className="ratestar">
              <p className="popup-label">Rate Us</p>
              <div className="popup-stars">
                {[1, 2, 3, 4, 5].map(star => (
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
              onChange={e => setFeedbackText(e.target.value)}
            />
            {localError && <div className="feedback-error">{localError}</div>}
            {error && <div className="feedback-error">{error}</div>}
            <button className="popup-submit" onClick={handleSubmit}>
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackSection;
