import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
// Import other pages here later (Dashboard, Expense, etc.)

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add more routes here */}
    </Routes>
  );
};

export default AppRoutes;