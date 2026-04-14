import React from "react";

function HomePage() {
  return (
    <>
      <div className="landing">
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-text">
            <h1>
              Explore & Connect Your <br />
              Campus Community with <span>Kibanda</span>
            </h1>

            <p>
              Buy and sell items, find hostels, connect with tutors, and
              advertise your services—all on a single, student-focused platform.
            </p>

            <button className="hero-btn">Get Started Free</button>
          </div>

          <div className="hero-animation">
            <div className="center-logo">
              <img src="/Kibanda.png" alt="Kibanda logo" />
            </div>

            <span className="floating-icon icon-1">📚</span>
            <span className="floating-icon icon-2">🏠</span>
            <span className="floating-icon icon-3">🧑‍🏫</span>
            <span className="floating-icon icon-4">🛠️</span>
            <span className="floating-icon icon-5">🎨</span>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="features">
          <h2>Empowering Students On Campus</h2>

          <div className="cards">
            <div className="card">
              <img src="/image 1.png" alt="" />
              <h3>Buy & Sell Items</h3>
              <p>
                Trade books, electronics, clothes, and more with other students.
              </p>
            </div>

            <div className="card">
              <img src="find_hostels.png" alt="" />
              <h3>Find Hostels</h3>
              <p>
                Search for off-campus accommodations and find the perfect place.
              </p>
            </div>

            <div className="card">
              <img src="/tutor.png" alt="" />
              <h3>Hire a Tutor</h3>
              <p>Connect with qualified tutors for help with your studies.</p>
            </div>

            <div className="card">
              <img src="/services.png" alt="" />
              <h3>Offer Services</h3>
              <p>
                Advertise your skills like repair, design, or hair braiding.
              </p>
            </div>
          </div>
          {/* Why choose Kibanda */}
          <h2 class="section-heading">Why Choose Kibanda?</h2>
          <section className="hero-features">
            <div className="feature">
              <h3>Built for Students</h3>
              <p>Everything is tailored for campus life and student needs.</p>
            </div>

            <div className="feature">
              <h3>Affordable Services</h3>
              <p>
                Get services from fellow students at budget-friendly prices.
              </p>
            </div>

            <div className="feature">
              <h3>All-in-One Platform</h3>
              <p>No need to jump between apps—everything is here.</p>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}

export default HomePage;
