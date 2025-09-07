import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroOverlay from './components/IntroOverlay';
import Portfolio from './components/Portfolio';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Set the document title
    document.title = "Developer Portfolio";
    
    // Trigger intro animation completion after delay
    const timer = setTimeout(() => {
      setIntroComplete(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="*" element={
          <div className="app-container">
            <IntroOverlay visible={!introComplete} />
            <Portfolio visible={introComplete} />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;