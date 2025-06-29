import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import FullCategoryPage from './components/fullCategory/FullCategoryPage'; // create this if not already

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<FullCategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
