import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import SkipSelectionPage from './pages/SkipSelection';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/skip-selection" element={<SkipSelectionPage />} />
        <Route path="/" element={<SkipSelectionPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;