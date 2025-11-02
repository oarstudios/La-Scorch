import React, { useEffect } from 'react';
import Slider from 'react-slick';
import starIcon from '../../Images/stars.png'; // your star icon
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFeedbacks } from '../../features/Feedback/feedbackSlice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './FeedbackView.css';

const sliderSettings = (count) => ({
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2500,
  pauseOnHover: true,
  speed: 600,
  arrows: false,
  slidesToShow: Math.min(count, 5),
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: { slidesToShow: Math.min(count, 3) }
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: Math.min(count, 2) }
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 }
    }
  ]
});

const FeedbackView = () => {
  const dispatch = useDispatch();
  const { feedbacks, loading, error } = useSelector(state => state.feedback);

  useEffect(() => {
    dispatch(fetchAllFeedbacks());
  }, [dispatch]);

  if (loading) return <div className="feedback-loading">Loading feedbacks...</div>;
  if (error) return <div className="feedback-error">Error: {error}</div>;

  return (
    <div className="feedback-view-section">
      <p className="feedback-view-subtitle">People Love Us</p>
      <h2 className="feedback-view-title">Feedback</h2>
      {feedbacks.length === 0 && (
        <p className="no-feedback">No feedbacks yet.</p>
      )}
      {feedbacks.length > 0 && feedbacks.length < 3 && (
        <div className="feedback-static-row">
          {feedbacks.map((item, index) => (
            <div key={item._id || index} className="feedback-card-wrapper">
              <div className="feedback-card">
                <div className="feedback-header">
                  <span className="feedback-name">{item.userId?.username || 'User'}</span>
                  <div className="feedback-rating">
                    {item.rating}/5
                    <img src={starIcon} alt="star" />
                  </div>
                </div>
                <p className="feedback-text">“{item.feedbackText}”</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {feedbacks.length >= 3 && (
        <Slider {...sliderSettings(feedbacks.length)} className="feedback-slider">
          {feedbacks.map((item, index) => (
            <div key={item._id || index} className="feedback-card-wrapper">
              <div className="feedback-card">
                <div className="feedback-header">
                  <span className="feedback-name">{item.userId?.username || 'User'}</span>
                  <div className="feedback-rating">
                    {item.rating}/5
                    <img src={starIcon} alt="star" />
                  </div>
                </div>
                <p className="feedback-text">“{item.feedbackText}”</p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default FeedbackView;
