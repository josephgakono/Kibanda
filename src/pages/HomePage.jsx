import React from 'react'

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

        <div className="hero-image">
          <img src="/Kibanda.png" alt="Kibanda" />
        </div>
      </section>


      {/* FEATURES SECTION */}
      <section className="features">
        <h2>Empowering Students On Campus</h2>

        <div className="cards">

          <div className="card">
            <img src="/image 1.png" alt="" />
            <h3>Buy & Sell Items</h3>
            <p>Trade books, electronics, clothes, and more with other students.</p>
          </div>

          <div className="card">
            <img src="find_hostels.png" alt="" />
            <h3>Find Hostels</h3>
            <p>Search for off-campus accommodations and find the perfect place.</p>
          </div>

          <div className="card">
            <img src="/tutor.png" alt="" />
            <h3>Hire a Tutor</h3>
            <p>Connect with qualified tutors for help with your studies.</p>
          </div>

          <div className="card">
            <img src="/services.png" alt="" />
            <h3>Offer Services</h3>
            <p>Advertise your skills like repair, design, or hair braiding.</p>
          </div>

        </div>
      </section>

    </div>
    </>
  )
}

export default HomePage