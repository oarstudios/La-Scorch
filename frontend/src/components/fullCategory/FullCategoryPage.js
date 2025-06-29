import React from 'react';
import { useLocation } from 'react-router-dom';

const FullCategoryPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const type = query.get('type') || 'Chocolateries';

  return (
    <div style={{ padding: '40px' }}>
      <h1>{type} - All Products</h1>
      {/* Render your product list here */}
    </div>
  );
};

export default FullCategoryPage;
