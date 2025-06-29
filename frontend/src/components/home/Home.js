import React from 'react';
import Navbar from '../../components/home/Navbar';
import SliderComponent from './SliderComponent';
import CategorySection from './CategorySection';
import AboutUs from './AboutUs';
import BestSellerSection from './BestSellerSection';
import CupcakeBoxSection from './CupcakeBoxSection';
import MakingProcess from './MakingProcess';
import MenuSection from './MenuSection';
import FeedbackSection from './FeedbackSection';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <SliderComponent/>
      <CategorySection/>
      <AboutUs/>
      <BestSellerSection/>
      <CupcakeBoxSection/>
      <MakingProcess/>
      <MenuSection/>
      <FeedbackSection/>
      <Footer/>
    
    </>
  );
};

export default Home;
