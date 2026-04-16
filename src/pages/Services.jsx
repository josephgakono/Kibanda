import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Services() {
  const navigate = useNavigate();

  const servicesData = [
    {
      id: 1,
      title: "Homework Help",
      description: "Get assistance with homework assignments in any subject.",
      image: "/homework.png",
      category: "Tutoring",
    },
    {
      id: 2,
      title: "Tech Repair",
      description: "Fix phone or laptop issues at affordable prices.",
      image: "/tech_repair.png",
      category: "Tech Repair",
    },
    {
      id: 3,
      title: "Web Development",
      description: "Hire students for web development projects.",
      image: "/web_development.png",
      category: "Web Development",
    },
    {
      id: 4,
      title: "Graphic Design",
      description: "Find creative students for logos and posters.",
      image: "/graphic_design.png",
      category: "Graphic Design",
    },
    {
      id: 5,
      title: "Photography",
      description: "Hire students for campus photo shoots and events.",
      image: "/photography.png",
      category: "Photography",
    },
    {
      id: 6,
      title: "Hair Braiding",
      description: "Get your hair styled by skilled student braiders.",
      image: "/braiding.png",
      category: "Hair Braiding",
    },
    {
      id: 7,
      title: "Fitness Training",
      description: "Hire a student trainer to help you stay in shape.",
      image: "/fitness.png",
      category: "Other",
    },
    {
      id: 8,
      title: "Offer Services",
      description:
        "Advertise your skills like repair, design, or hair braiding.",
      image: "/services.png",
      category: "Other",
      action: "/add-service",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesCategory =
        selectedCategory === "All" || service.category === selectedCategory;

      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleExplore = (service) => {
    if (service.action) {
      navigate(service.action);
      return;
    }

    navigate(`/listings?category=${encodeURIComponent(service.category)}`);
  };
  const handleSearchClick = () => {};

  return (
    <section className="services-page">
      <div className="hero">
        <div className="services-left">
          <h1>Services</h1>
          <p>Student-to-student services connecting your campus community</p>

          <div className="search-bar">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearchClick}>Search</button>
          </div>

          <div className="category-tabs">
            <button
              className={`tab ${selectedCategory === "All" ? "active" : ""}`}
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>

            <button
              className={`tab ${selectedCategory === "Tutoring" ? "active" : ""}`}
              onClick={() => setSelectedCategory("Tutoring")}
            >
              Tutoring
            </button>

            <button
              className={`tab ${selectedCategory === "Tech Repair" ? "active" : ""}`}
              onClick={() => setSelectedCategory("Tech Repair")}
            >
              Repair & Tech
            </button>

            <button
              className={`tab ${selectedCategory === "Graphic Design" ? "active" : ""}`}
              onClick={() => setSelectedCategory("Graphic Design")}
            >
              Creative
            </button>

            <button
              className={`tab ${selectedCategory === "Other" ? "active" : ""}`}
              onClick={() => setSelectedCategory("Other")}
            >
              More ⌄
            </button>
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

      <div className="top-services-section">
        <h2>Browse Top Services</h2>

        {filteredServices.length === 0 ? (
          <div className="no-services-message">
            <h3>No services found</h3>
            <p>Try another search or category.</p>
          </div>
        ) : (
          <div className="services-grid">
            {filteredServices.map((service) => (
              <div className="service-card" key={service.id}>
                <div className="service-top">
                  <img src={service.image} alt={service.title} />
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>

                <button
                  className="explore-btn"
                  onClick={() => handleExplore(service)}
                >
                  {service.action ? "Add Service" : "Explore"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;
