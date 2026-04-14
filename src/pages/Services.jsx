import React from "react";

function Services() {
  return (
    <>
      <section className="services-page">
        {/* HERO */}
        <div className="hero">
          <div className="services-left">
            <h1>Services</h1>
            <p>Student-to-student services connecting your campus community</p>

            <div className="search-bar">
              <span className="search-icon">⌕</span>
              <input type="text" placeholder="Search services..." />
              <button>Search</button>
            </div>

            <div className="category-tabs">
              <button className="tab active">All</button>
              <button className="tab">Tutoring</button>
              <button className="tab">Repair & Tech</button>
              <button className="tab">Creative</button>
              <button className="tab">More ⌄</button>
            </div>
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
          </div>

        {/* TOP SERVICES */}
        <div className="top-services-section">
          <h2>Browse Top Services</h2>

          <div className="services-grid">
            {/* CARD */}
            <div className="service-card">
              <div className="service-top">
                <img src="/homework.png" />
                <div>
                  <h3>Homework Help</h3>
                  <p>
                    Get assistance with homework assignments in any subject.
                  </p>
                </div>
              </div>
              <button className="explore-btn">Explore</button>
            </div>

            <div className="service-card">
              <div className="service-top">
                <img src="/tech_repair.png" />
                <div>
                  <h3>Tech Repair</h3>
                  <p>Fix phone or laptop issues at affordable prices.</p>
                </div>
              </div>
              <button className="explore-btn">Explore</button>
            </div>

            <div className="service-card">
              <div className="service-top">
                <img src="/web_development.png" />
                <div>
                  <h3>Web Development</h3>
                  <p>Hire students for web development projects.</p>
                </div>
              </div>
              <button className="explore-btn">Explore</button>
            </div>

            <div className="service-card">
              <div className="service-top">
                <img src="/graphic_design.png" />
                <div>
                  <h3>Graphic Design</h3>
                  <p>Find creative students for logos and posters.</p>
                </div>
              </div>
              <button className="explore-btn">Explore</button>
            </div>

            <div className="service-card">
              <div className="service-top">
                <img src="/photography.png" />
                <div>
                  <h3>Photography</h3>
                  <p>Hire students for campus photo shoots and events.</p>
                </div>
              </div>
              <button className="explore-btn">Explore</button>
            </div>

            <div className="service-card">
              <div className="service-top">
                <img src="/braiding.png" />
                <div>
                  <h3>Hair Braiding</h3>
                  <p>Get your hair styled by skilled student braiders.</p>
                </div>
              </div>
              <button className="explore-btn">Explore</button>
            </div>

            <div className="service-card">
              <div className="service-top">
                <img src="/fitness.png" />
                <div>
                  <h3>Fitness Training</h3>
                  <p>Hire a student trainer to help you stay in shape.</p>
                </div>
              </div>
              <button className="explore-btn">Explore</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
