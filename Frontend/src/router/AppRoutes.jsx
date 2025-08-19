import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Income from '../pages/Income';
import Expense from '../pages/Expense';
// import Contact from '../pages/Contact';
// import Faq from '../pages/Faq';
// Import other pages here later (Dashboard, Expense, etc.)

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/income" element={<Income />} />
      <Route path="/expense" element={<Expense />} />
      {/* <Route path="/faq" element={<Faq />} /> */}
      {/* <Route path="/contact" element={<Contact />} /> */}
      {/* Add more routes here */}
    </Routes>
  );
};

export default AppRoutes;