import React from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <img src="/Kibanda.png" alt="Kibanda" />
            <span>Kibanda</span>
          </div>

          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Services
            </NavLink>
            <NavLink
              to="/listings"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Listings
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard
            </NavLink>
          </div>

          <div className="navbar-auth">
            {user ? (
              <>
                <div className="navbar-user">
                  <span className="welcome-user">
                    {user.displayName
                      ? `Aloha, ${user.displayName.split(" ")[0]}`
                      : `Aloha, ${user.email.split("@")[0]}`}
                  </span>

                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>

                  <Link to="/add-service" className="navbar-btn">
                    Add Service
                  </Link>
                </div>
              </>
            ) : (
              <Link to="/auth">
                <button className="navbar-btn">Get Started</button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
