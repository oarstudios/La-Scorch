import React from 'react';
import './SliderComponent.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const slides = [
  {
    image: require('../../Images/slider1.jpg'), // replace with your image
    title: "MOTHER’S DAY SPECIAL",
    subtitle: "Tart | Bun | Cheese",
    description: "To the most beautiful women in this entire world",
  },
  {
    image: require('../../Images/slider1.jpg'),
    title: "VALENTINE’S DAY LOVE",
    subtitle: "Red Velvet | Heart Cake",
    description: "Celebrate the sweetness of love this season",
  },
  {
    image: require('../../Images/slider1.jpg'),
    title: "CHOCOLATE HEAVEN",
    subtitle: "Fudge | Choco Drip",
    description: "Every bite melts into a memory",
  },
];

const SliderComponent = () => {
  return (
    <div className="slider-container">
      <Swiper
        loop={true}
        autoplay={{ delay: 5000 }}
        modules={[Autoplay]}
        className="slider-wrapper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-content">
                <p className="slide-subtitle">{slide.subtitle}</p>
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-desc">{slide.description}</p>
                <button className="order-btn">Order Now</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderComponent;
