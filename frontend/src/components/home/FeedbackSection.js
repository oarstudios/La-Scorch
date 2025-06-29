import React from 'react';
import './FeedbackSection.css';
import feedbackBox from '../../Images/May_14__2025__04_32_55_PM-removebg-preview 1.png';

const FeedbackSection = () => {
  return (
    <section className="feedback-section">
      <div className="feedback-left">
        <h2>Listen what people say about our delicious cakes!</h2>
        <button className="feedback-btn">Give Feedback</button>
      </div>
      <div className="feedback-right">
        <img src={feedbackBox} alt="Cake Feedback Box" className="feedback-img" />
      </div>
    </section>
  );
};

export default FeedbackSection;
