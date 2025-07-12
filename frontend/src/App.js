import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home/Home';
import FullCategoryPage from './components/fullCategory/FullCategoryPage';
import ProductDetails from './components/productPage/ProductDetails';
import Navbar from './components/home/Navbar';
import Footer from './components/home/Footer';
import YouMayAlsoLike from './components/YouMayAlsoLike/YouMayAlsoLike';

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<FullCategoryPage />} />
        <Route path="/product" element={<ProductDetails />} />
      </Routes>
      
      {/* Show YouMayAlsoLike only on product page */}
      {location.pathname === '/product' && <YouMayAlsoLike />}
      
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
