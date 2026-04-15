import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const resetMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const clearForm = () => {
    setFullName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRememberMe(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);

    try {
      if (isLogin) {
        if (!email.trim() || !password.trim()) {
          throw new Error("Please fill in your email and password.");
        }

        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMessage("Logged in successfully.");
        clearForm();

        setTimeout(() => {
          navigate("/");
        }, 800);
      } else {
        if (
          !fullName.trim() ||
          !username.trim() ||
          !email.trim() ||
          !password.trim() ||
          !confirmPassword.trim()
        ) {
          throw new Error("Please fill in all the fields.");
        }

        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters long.");
        }

        if (password !== confirmPassword) {
          throw new Error("Passwords do not match.");
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        await updateProfile(userCredential.user, {
          displayName: fullName,
        });

        setSuccessMessage("Account created successfully.");
        clearForm();

        setTimeout(() => {
          navigate("/");
        }, 800);
      }
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      switch (error.code) {
        case "auth/invalid-email":
          message = "That email address is not valid.";
          break;
        case "auth/user-not-found":
          message = "No account was found with that email.";
          break;
        case "auth/wrong-password":
          message = "Incorrect password.";
          break;
        case "auth/invalid-credential":
          message = "Invalid email or password.";
          break;
        case "auth/email-already-in-use":
          message = "That email is already being used.";
          break;
        case "auth/weak-password":
          message = "Password should be at least 6 characters.";
          break;
        default:
          if (error.message) {
            message = error.message;
          }
      }

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>
            {isLogin
              ? "Log in to continue exploring Kibanda."
              : "Join Kibanda and connect with your campus community."}
          </p>
        </div>

        <div className="auth-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(true);
              resetMessages();
            }}
            type="button"
          >
            Login
          </button>

          <button
            className={!isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(false);
              resetMessages();
            }}
            type="button"
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}

          {!isLogin && (
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          {isLogin && (
            <div className="auth-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>

              <a href="/">Forgot password?</a>
            </div>
          )}

          {errorMessage && (
            <p className="auth-error">{errorMessage}</p>
          )}

          {successMessage && (
            <p className="auth-success">{successMessage}</p>
          )}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading
              ? isLogin
                ? "Logging in..."
                : "Creating Account..."
              : isLogin
                ? "Login"
                : "Create Account"}
          </button>
        </form>

        <p className="auth-footer-text">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              resetMessages();
            }}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </section>
  );
}

export default Auth;
