import React from 'react';
import Slider from 'react-slick';
import starIcon from '../../Images/stars.png'; // your star icon
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './FeedbackView.css';

const feedbacks = [
  {
    name: 'Emy Walter',
    rating: '4/5',
    text: 'Their plant-based “Ginger-Cardamom Dream” cake is so rich and decadent, I almost forgot it’s vegan. Future of indulgence, no compromise.',
  },
  {
    name: 'Emy Walter',
    rating: '4/5',
    text: 'Just tried their AI-designed “Cosmic Red Velvet”—flavor notes of blackberry and mesquite that evolve as you eat. Truly next-gen patisserie.',
  },
  {
    name: 'Emy Walter',
    rating: '4/5',
    text: 'I ordered a “Blooming Rose” 3D-printed sugar sculpture on top of my cake. It opened like a flower when the candle’s heat hit it—Instagram gold.',
  },
  {
    name: 'Emy Walter',
    rating: '4/5',
    text: 'I ordered a “Blooming Rose” 3D-printed sugar sculpture on top of my cake. It opened like a flower when the candle’s heat hit it—Instagram gold.',
  },
  {
    name: 'Emy Walter',
    rating: '4/5',
    text: 'I ordered a “Blooming Rose” 3D-printed sugar sculpture on top of my cake. It opened like a flower when the candle’s heat hit it—Instagram gold.',
  },
];

const settings = {
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2500,
  pauseOnHover: true,
  speed: 600,
  arrows: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: { slidesToShow: 3 }
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 }
    }
  ]
};

const FeedbackView = () => {
  return (
    <div className="feedback-view-section">
      <p className="feedback-view-subtitle">People Love Us</p>
      <h2 className="feedback-view-title">Feedback</h2>

      <Slider {...settings} className="feedback-slider">
        {feedbacks.map((item, index) => (
          <div key={index} className="feedback-card-wrapper">
            <div className="feedback-card">
              <div className="feedback-header">
                <span className="feedback-name">{item.name}</span>
                <div className="feedback-rating">
                  {item.rating}
                  <img src={starIcon} alt="star" />
                </div>
              </div>
              <p className="feedback-text">“{item.text}”</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeedbackView;
