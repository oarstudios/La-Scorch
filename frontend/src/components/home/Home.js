import React from 'react';

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
  return (
    <>

      <SliderComponent/>
      <CategorySection/>
      <AboutUs/>
      <BestSellerSection/>
      <CupcakeBoxSection/>
      <MakingProcess/>
      <MenuSection/>
      <FeedbackView/>
      <FeedbackSection/>

    
    </>
  );
};

export default Home;
