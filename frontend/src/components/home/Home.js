import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SliderComponent from './SliderComponent';
import CategorySection from './CategorySection';
import AboutUs from './AboutUs';
import BestSellerSection from './BestSellerSection';
import CupcakeBoxSection from './CupcakeBoxSection';
import MakingProcess from './MakingProcess';
import MenuSection from './MenuSection';
import FeedbackSection from './FeedbackSection';
import FeedbackView from './FeedbackView';

const Home = () => {
  const location = useLocation();
  const user = useSelector(state => state.auth.user);  // Get logged-in user from Redux

  useEffect(() => {
    if (location.state?.scrollTo === 'feedback') {
      const section = document.getElementById('feedback');
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100); // delay to ensure DOM is mounted
      }
    }
  }, [location]);

  return (
    <>
      <SliderComponent />
      <CategorySection />
      <AboutUs />
      <BestSellerSection />
      <CupcakeBoxSection />
      <MakingProcess />
      <MenuSection />
      <FeedbackView />
      <FeedbackSection id="feedback" userId={user?._id} />  {/* Pass userId to feedback */}
    </>
  );
};

export default Home;
