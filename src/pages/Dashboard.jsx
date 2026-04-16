import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { Navigate, Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

function Dashboard() {
  const user = auth.currentUser;
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    serviceTitle: "",
    category: "",
    price: "",
    location: "",
    contact: "",
    imageUrl: "",
    description: "",
  });

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

  const handleEditClick = (service) => {
    setEditingId(service.id);
    setEditForm({
      serviceTitle: service.serviceTitle || "",
      category: service.category || "",
      price: service.price || "",
      location: service.location || "",
      contact: service.contact || "",
      imageUrl: service.imageUrl || "",
      description: service.description || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = async (serviceId) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      await updateDoc(doc(db, "services", serviceId), {
        serviceTitle: editForm.serviceTitle.trim(),
        category: editForm.category.trim(),
        price: editForm.price.trim(),
        location: editForm.location.trim(),
        contact: editForm.contact.trim(),
        imageUrl: editForm.imageUrl.trim(),
        description: editForm.description.trim(),
      });

      setSuccessMessage("Service updated successfully.");
      setEditingId(null);
    } catch (error) {
      console.log("Update error:", error);
      setErrorMessage("Failed to update service.");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
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
                {editingId === service.id ? (
                  <div className="dashboard-edit-form">
                    <input
                      type="text"
                      name="serviceTitle"
                      value={editForm.serviceTitle}
                      onChange={handleEditChange}
                      placeholder="Service title"
                    />

                    <input
                      type="text"
                      name="category"
                      value={editForm.category}
                      onChange={handleEditChange}
                      placeholder="Category"
                    />

                    <input
                      type="text"
                      name="price"
                      value={editForm.price}
                      onChange={handleEditChange}
                      placeholder="Price"
                    />

                    <input
                      type="text"
                      name="location"
                      value={editForm.location}
                      onChange={handleEditChange}
                      placeholder="Location"
                    />

                    <input
                      type="text"
                      name="contact"
                      value={editForm.contact}
                      onChange={handleEditChange}
                      placeholder="Contact"
                    />

                    <input
                      type="text"
                      name="imageUrl"
                      value={editForm.imageUrl}
                      onChange={handleEditChange}
                      placeholder="Image URL"
                    />

                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      placeholder="Description"
                    />

                    <div className="dashboard-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleSaveEdit(service.id)}
                      >
                        Save
                      </button>

                      <button className="delete-btn" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="dashboard-card-top">
                      <span className="dashboard-category">
                        {service.category}
                      </span>
                      <span className="dashboard-price">{service.price}</span>
                    </div>

                    <h3>{service.serviceTitle}</h3>
                    <p className="dashboard-description">
                      {service.description}
                    </p>

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
                        onClick={() => handleEditClick(service)}
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
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Dashboard;
