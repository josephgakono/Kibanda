import React, { useEffect, useMemo, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { Navigate } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";

function Listings() {
  const user = auth.currentUser;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);

  useEffect(() => {
    setActiveCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  useEffect(() => {
    const servicesRef = collection(db, "services");
    const servicesQuery = query(servicesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      servicesQuery,
      (snapshot) => {
        const fetchedServices = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setServices(fetchedServices);
        setLoading(false);
      },
      (error) => {
        console.log("Error fetching services:", error);
        setErrorMessage("Failed to load listings.");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      "All",
      ...new Set(
        services
          .map((service) => service.category)
          .filter((category) => category && category.trim() !== ""),
      ),
    ];

    return uniqueCategories;
  }, [services]);

  const filteredServices = useMemo(() => {
    if (activeCategory === "All") return services;
    return services.filter((service) => service.category === activeCategory);
  }, [services, activeCategory]);

  const groupedServices = useMemo(() => {
    const grouped = {};

    filteredServices.forEach((service) => {
      const category = service.category || "Other";

      if (!grouped[category]) {
        grouped[category] = [];
      }

      grouped[category].push(service);
    });

    return grouped;
  }, [filteredServices]);

  return (
    <section className="listings-page">
      <div className="listings-hero">
        <span className="listings-badge">KIBANDA LISTINGS</span>
        <h1>Everything Campus Needs, In One Kibanda</h1>

        <p>
          Kutoka tutoring na hostels hadi repairs, design, na photography,
          Kibanda makes it easy kupata services from fellow students wenye
          wanaelewa campus life.
        </p>
      </div>

      <div className="listings-controls">
        <h2>Browse by Category</h2>

        <div className="category-filter-row">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-pill ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="listings-state-card">
          <h3>Loading services...</h3>
          <p>Fetching the latest student listings.</p>
        </div>
      )}

      {!loading && errorMessage && (
        <div className="listings-state-card error">
          <h3>Something went wrong</h3>
          <p>{errorMessage}</p>
        </div>
      )}

      {!loading && !errorMessage && filteredServices.length === 0 && (
        <div className="listings-state-card">
          <h3>No listings yet</h3>
          <p>
            There are no services in this category yet.
          </p>
        </div>
      )}

      {!loading && !errorMessage && filteredServices.length > 0 && (
        <div className="listings-content">
          {Object.entries(groupedServices).map(
            ([category, categoryServices]) => (
              <div className="listing-category-section" key={category}>
                <div className="section-title-row">
                  <h2>{category}</h2>
                  <span>{categoryServices.length} listing(s)</span>
                </div>

                <div className="services-grid">
                  {categoryServices.map((service) => (
                    <article className="listing-card" key={service.id}>
                      <div className="listing-image-wrap">
                        {service.imageUrl ? (
                          <img
                            src={service.imageUrl}
                            alt={service.serviceTitle}
                            className="listing-image"
                          />
                        ) : (
                          <div className="listing-image-placeholder">
                            <span>{service.category?.charAt(0) || "S"}</span>
                          </div>
                        )}
                      </div>

                      <div className="listing-card-body">
                        <div className="listing-top-row">
                          <span className="listing-category-badge">
                            {service.category || "Other"}
                          </span>
                          <span className="listing-price">{service.price}</span>
                        </div>

                        <h3>{service.serviceTitle}</h3>
                        <p className="listing-description">
                          {service.description}
                        </p>

                        <div className="listing-meta">
                          <p>
                            <strong>Location:</strong> {service.location}
                          </p>
                          <p>
                            <strong>Contact:</strong> {service.contact}
                          </p>
                          <p>
                            <strong>Posted by:</strong> {service.userName}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </section>
  );
}

export default Listings;
