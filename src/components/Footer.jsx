import React from "react";

function Footer() {
  return (
    <>
     <footer className="footer">
      <div className="footer-top">

        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/Kibanda.png" alt="Kibanda Logo" />
            <h2>Kibanda</h2>
          </div>

          <p>
            Your campus, connected. Buy, sell, find services, tutors,
            hostels, and more all in one place.
          </p>

          <div className="footer-socials">
            <a href="/">Instagram</a>
            <a href="/">Twitter</a>
            <a href="/">LinkedIn</a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/listings">Listings</a>
          <a href="/auth">Get Started</a>
        </div>

        <div className="footer-links">
          <h3>Services</h3>
          <a href="/">Tutors</a>
          <a href="/">Hostels</a>
          <a href="/">Graphic Design</a>
          <a href="/">Photography</a>
        </div>

        <div className="footer-links">
          <h3>Support</h3>
          <a href="/">Help Center</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms of Service</a>
          <a href="/">Contact Us</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Kibanda. Built for students, because campus chaos needed a platform.</p>
      </div>
    </footer>
    </>
  );
}

export default Footer;
