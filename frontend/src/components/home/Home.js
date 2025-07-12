import React from 'react';

import SliderComponent from './SliderComponent';
import CategorySection from './CategorySection';
import AboutUs from './AboutUs';
import BestSellerSection from './BestSellerSection';
import CupcakeBoxSection from './CupcakeBoxSection';
import MakingProcess from './MakingProcess';
import MenuSection from './MenuSection';
import FeedbackSection from './FeedbackSection';


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
      <FeedbackSection/>

    
    </>
  );
};

export default Home;
