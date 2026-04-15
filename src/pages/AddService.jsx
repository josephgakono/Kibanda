import React, { useState } from "react";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Navigate } from "react-router-dom";

function AddService() {
  const user = auth.currentUser;

  const [serviceTitle, setServiceTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (
      !serviceTitle.trim() ||
      !category.trim() ||
      !price.trim() ||
      !location.trim() ||
      !contact.trim() ||
      !description.trim()
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "services"), {
        serviceTitle: serviceTitle.trim(),
        category: category.trim(),
        price: price.trim(),
        location: location.trim(),
        contact: contact.trim(),
        imageUrl: imageUrl.trim(),
        description: description.trim(),
        userId: user.uid,
        userEmail: user.email || "",
        userName: user.displayName || "Anonymous User",
        createdAt: serverTimestamp(),
      });

      setSuccessMessage("Your service has been added successfully.");

      setServiceTitle("");
      setCategory("");
      setPrice("");
      setLocation("");
      setContact("");
      setImageUrl("");
      setDescription("");
    } catch (error) {
      setErrorMessage("Failed to add service. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="add-service-page">
      <div className="add-service-wrapper">
        <div className="add-service-left">
          <span className="add-service-badge">KIBANDA SERVICE FORM</span>
          <h1>Add Your Service</h1>
          <p>
            Let other students discover what you offer. Post your service,
            set your price, and make it easy for people on campus to reach you.
          </p>

          <div className="add-service-highlights">
            <div className="highlight-card">
              <h3>Reach More Students</h3>
              <p>Make your skills visible to your campus community.</p>
            </div>

            <div className="highlight-card">
              <h3>Simple & Fast</h3>
              <p>Fill in a few details and publish your service in minutes.</p>
            </div>

            <div className="highlight-card">
              <h3>Build Your Hustle</h3>
              <p>From tutoring to design to repairs, let your talent pay.</p>
            </div>
          </div>
        </div>

        <div className="add-service-card">
          <div className="form-header">
            <h2>Service Details</h2>
            <p>Complete the form below to publish your service.</p>
          </div>

          <form className="add-service-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Service Title</label>
              <input
                type="text"
                placeholder="e.g. Graphic Design, Hair Braiding, Laptop Repair"
                value={serviceTitle}
                onChange={(e) => setServiceTitle(e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="Tutoring">Tutoring</option>
                  <option value="Tech Repair">Tech Repair</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Photography">Photography</option>
                  <option value="Hair Braiding">Hair Braiding</option>
                  <option value="Typing">Typing</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="text"
                  placeholder="e.g. KSh 500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="e.g. Near campus gate / Around hostels"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Contact</label>
                <input
                  type="text"
                  placeholder="e.g. Phone number or WhatsApp"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Image URL (Optional)</label>
              <input
                type="text"
                placeholder="Paste image link for your service"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Describe your service, experience, what you offer, and why students should choose you..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {errorMessage && <p className="form-message error">{errorMessage}</p>}
            {successMessage && <p className="form-message success">{successMessage}</p>}

            <button type="submit" className="submit-service-btn" disabled={loading}>
              {loading ? "Publishing..." : "Publish Service"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddService;