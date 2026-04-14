import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
    <nav className="navbar">
      <div className="navbar-container">
        
        <div className="logo">
          <img src="/Kibanda.png" alt="Kibanda" />
          <span>Kibanda</span>
        </div>

        <div className="nav-links">
          <Link to="/Home">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/listings">Listings</Link>
          <Link to="/help">Help</Link>
         

        </div>

        <button className="cta-btn">Get Started</button>

      </div>
    </nav>
    </>
  );
}

export default Navbar;
