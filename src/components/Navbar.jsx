import React from "react";

function Navbar() {
  return (
    <>
    <nav className="navbar">
      <div className="navbar-container">
        
        <div className="logo">
          <img src="/Kibanda.png" alt="Kibanda" />
          <span>Kibanda</span>
        </div>

        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Listings</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Help</a></li>
        </ul>

        <button className="cta-btn">Get Started</button>

      </div>
    </nav>
    </>
  );
}

export default Navbar;
