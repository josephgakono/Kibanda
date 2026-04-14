import React from 'react'

function Services() {
  return (
    <>
    <section class="services-page">

  { /* HERO */ }
  <div class="services-hero">

    <div class="services-left">
      <h1>Services</h1>
      <p>Student-to-student services connecting your campus community</p>

      <div class="search-bar">
        <span class="search-icon">⌕</span>
        <input type="text" placeholder="Search services..." />
        <button>Search</button>
      </div>

      <div class="category-tabs">
        <button class="tab active">All</button>
        <button class="tab">Tutoring</button>
        <button class="tab">Repair & Tech</button>
        <button class="tab">Creative</button>
        <button class="tab">More ⌄</button>
      </div>
    </div>

    <div class="services-right">
      <img src="/Kibanda.png" alt="Kibanda" />
    </div>

  </div>

  {/* TOP SERVICES */}
  <div class="top-services-section">
    <h2>Browse Top Services</h2>

    <div class="services-grid">

      {/* CARD */}
      <div class="service-card">
        <div class="service-top">
          <img src="/homework.png" />
          <div>
            <h3>Homework Help</h3>
            <p>Get assistance with homework assignments in any subject.</p>
          </div>
        </div>
        <button class="explore-btn">Explore</button>
      </div>

      <div class="service-card">
        <div class="service-top">
          <img src="/tech_repair.png" />
          <div>
            <h3>Tech Repair</h3>
            <p>Fix phone or laptop issues at affordable prices.</p>
          </div>
        </div>
        <button class="explore-btn">Explore</button>
      </div>

      <div class="service-card">
        <div class="service-top">
          <img src="/web_development.png" />
          <div>
            <h3>Web Development</h3>
            <p>Hire students for web development projects.</p>
          </div>
        </div>
        <button class="explore-btn">Explore</button>
      </div>

      <div class="service-card">
        <div class="service-top">
          <img src="/graphic_design.png" />
          <div>
            <h3>Graphic Design</h3>
            <p>Find creative students for logos and posters.</p>
          </div>
        </div>
        <button class="explore-btn">Explore</button>
      </div>

      <div class="service-card">
        <div class="service-top">
          <img src="/photography.png" />
          <div>
            <h3>Photography</h3>
            <p>Hire students for campus photo shoots and events.</p>
          </div>
        </div>
        <button class="explore-btn">Explore</button>
      </div>

      <div class="service-card">
        <div class="service-top">
          <img src="/braiding.png" />
          <div>
            <h3>Hair Braiding</h3>
            <p>Get your hair styled by skilled student braiders.</p>
          </div>
        </div>
        <button class="explore-btn">Explore</button>
      </div>

      <div class="service-card">
        <div class="service-top">
          <img src="/fitness.png" />
          <div>
            <h3>Fitness Training</h3>
            <p>Hire a student trainer to help you stay in shape.</p>
          </div>
        </div>
        <button class="explore-btn">Explore</button>
      </div>

    </div>
  </div>

</section>
    </>
  )
}

export default Services