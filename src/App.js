import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './component/Home';
import { MyNavbar } from './frame/MyNavbar';
import { Footer } from './frame/Footer';
import OtpQrPage from './component/OtpQrPage';

import './App.css';
import { RegisterUserForm } from './user/RegisterUserForm';
import { AuthProvider } from './user/Authcontext';
import { LoginForm } from './user/LoginForm';
import { NotFound } from './component/NotFound';
import { Info } from './component/Info';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <MyNavbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/info" element={<Info/>} />
              <Route path="/view_qr" element={<OtpQrPage/>} />
              <Route path="/user/register" element={<RegisterUserForm/>} />
              <Route path="/login" element={<LoginForm/>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
  

export default App;
