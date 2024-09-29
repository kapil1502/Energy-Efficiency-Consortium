
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CertifyProduct from './pages/CertifyProduct';
import ManageIssuers from './pages/ManageIssuers';
import VerifyCertification from './pages/VerifyCertification';
import NavBar from './components/NavBar';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/certify-product" element={<CertifyProduct />} />
            <Route path="/manage-issuers" element={<ManageIssuers />} />
            <Route path="/verify-certification" element={<VerifyCertification />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const Home = () => (
  <div className="home-page">
    <h1 className="main-title">Energy Certification System</h1>
    <p className="description">Promoting Sustainable Energy through Verified Products</p>
    <div className="links">
      <Link to="/certify-product" className="link-button">Certify Product</Link>
      <Link to="/manage-issuers" className="link-button">Manage Issuers</Link>
      <Link to="/verify-certification" className="link-button">Verify Certification</Link>
    </div>
  </div>
);

export default App;
