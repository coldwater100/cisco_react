import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './component/Home';
import { MyNavbar } from './frame/MyNavbar';
import { Footer } from './frame/Footer';
import OtpQrPage from './component/OtpQrPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <MyNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<OtpQrPage/>} />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}
  

export default App;
