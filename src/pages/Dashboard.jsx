import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { Navigate, Link, useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

function Dashboard() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!user) return;

    const servicesRef = collection(db, "services");
    const q = query(
      servicesRef,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const services = snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }));

        setMyServices(services);
        setLoading(false);
      },
      (error) => {
        console.log("Dashboard fetch error:", error);
        setErrorMessage("Failed to load your services.");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (serviceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?",
    );

    if (!confirmDelete) return;

    try {
      setErrorMessage("");
      setSuccessMessage("");

      await deleteDoc(doc(db, "services", serviceId));
      setSuccessMessage("Service deleted successfully.");
    } catch (error) {
      console.log("Delete error:", error);
      setErrorMessage("Failed to delete service.");
    }
  };

  const handleEdit = (serviceId) => {
    navigate(`/edit-service/${serviceId}`);
  };

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <span className="dashboard-badge">MY DASHBOARD</span>
          <h1>
            Welcome back,{" "}
            {user.displayName
              ? user.displayName.split(" ")[0]
              : user.email.split("@")[0]}
          </h1>
          <p>
            Manage the services you have posted on Kibanda. Edit, delete, or add
            new ones from here.
          </p>
        </div>

        <Link to="/add-service" className="dashboard-add-btn">
          Add New Service
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-box">
          <h3>{myServices.length}</h3>
          <p>Total Services</p>
        </div>

        <div className="stat-box">
          <h3>{new Set(myServices.map((item) => item.category)).size}</h3>
          <p>Categories Used</p>
        </div>

        <div className="stat-box">
          <h3>
            {myServices.length > 0 ? myServices[0].category || "N/A" : "N/A"}
          </h3>
          <p>Latest Category</p>
        </div>
      </div>

      {errorMessage && (
        <p className="dashboard-message error">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="dashboard-message success">{successMessage}</p>
      )}

      {loading ? (
        <div className="dashboard-state-card">
          <h2>Loading your services...</h2>
          <p>Please wait while we fetch your listings.</p>
        </div>
      ) : myServices.length === 0 ? (
        <div className="dashboard-state-card">
          <h2>No services yet</h2>
          <p>
            You have not added any services yet. Start building your campus
            hustle.
          </p>
          <Link to="/add-service" className="empty-add-btn">
            Add Your First Service
          </Link>
        </div>
      ) : (
        <div className="dashboard-grid">
          {myServices.map((service) => (
            <article className="dashboard-card" key={service.id}>
              <div className="dashboard-card-image-wrap">
                {service.imageUrl ? (
                  <img
                    src={service.imageUrl}
                    alt={service.serviceTitle}
                    className="dashboard-card-image"
                  />
                ) : (
                  <div className="dashboard-card-placeholder">
                    <span>
                      {service.serviceTitle?.charAt(0).toUpperCase() || "S"}
                    </span>
                  </div>
                )}
              </div>

              <div className="dashboard-card-body">
                <div className="dashboard-card-top">
                  <span className="dashboard-category">{service.category}</span>
                  <span className="dashboard-price">{service.price}</span>
                </div>

                <h3>{service.serviceTitle}</h3>
                <p className="dashboard-description">{service.description}</p>

                <div className="dashboard-meta">
                  <p>
                    <strong>Location:</strong> {service.location}
                  </p>
                  <p>
                    <strong>Contact:</strong> {service.contact}
                  </p>
                </div>

                <div className="dashboard-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(service.id)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(service.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Dashboard;
