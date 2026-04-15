import React from "react";
import { Link } from "react-router-dom";
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
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/listings">Listings</Link>
            <Link to="/help">Help</Link>
          </div>

          <div className="navbar-auth">
            {user ? (
              <>
                <div className="navbar-user">
                  <span>
                    {user.displayName
                      ? `Aloha, ${user.displayName.split(" ")[0]}`
                      : user.email}
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
