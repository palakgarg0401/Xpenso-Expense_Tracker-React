import React, { useEffect, useState } from 'react';
import '../assets/css/style.css';

const Home = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true; //default to dark
  });

  //Theme Toggle Logic
  useEffect(() => {
    if(darkMode) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const togglePassword = (id) => {
    const input = document.getElementById(id);
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Left Side – Login/Signup Form */}
        <div className="col-lg-5 col-md-12 form-container">
          <div className="form-wrapper">
            <div className="logo-container text-center mb-4">
              <h1 className="logo">Xpenso</h1>
            </div>

            {/* Login Form */}
            {showLogin ? (
              <div id="loginForm">
                <h2 className="text-center mb-4" style={{ color: "white" }}>Sign in to Xpenso</h2>
                <form>
                  <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email" required />
                    <div className="invalid-feedback">Please enter a valid email address.</div>
                  </div>

                  <div className="mb-3 password-field">
                    <input type="password" className="form-control" id="password" placeholder="Password" required />
                    <span className="password-toggle" onClick={() => togglePassword('password')}>
                      <i className="far fa-eye"></i>
                    </span>
                    <div className="invalid-feedback">Password is required.</div>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <a href="#" className="forgot-password">Forgot Password?</a>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-1">Sign in</button>

                  <div className="text-center mt-4">
                    <p>Don't have an account? <span className="text-link" onClick={() => setShowLogin(false)}>Sign Up now</span></p>
                  </div>
                </form>
              </div>
            ) : (
              // Signup Form
              <div id="signupForm">
                <h3 className="text-center mb-4">Create an Xpenso Account</h3>
                <form>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Full Name" required />
                    <div className="invalid-feedback">Please enter your full name.</div>
                  </div>

                  <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email" required />
                    <div className="invalid-feedback">Please enter a valid email address.</div>
                  </div>

                  <div className="mb-3 password-field">
                    <input type="password" className="form-control" id="signupPassword" placeholder="Password" required />
                    <span className="password-toggle" onClick={() => togglePassword('signupPassword')}>
                      <i className="far fa-eye"></i>
                    </span>
                    <div className="invalid-feedback">Password must be at least 8 characters with letters and numbers.</div>
                  </div>

                  <div className="mb-3 password-field">
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" required />
                    <span className="password-toggle" onClick={() => togglePassword('confirmPassword')}>
                      <i className="far fa-eye"></i>
                    </span>
                    <div className="invalid-feedback">Passwords do not match.</div>
                  </div>

                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="termsAgree" required />
                    <label className="form-check-label" htmlFor="termsAgree">
                      I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                    </label>
                    <div className="invalid-feedback">You must agree to the terms to continue.</div>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-1">Create Account</button>

                  <div className="text-center mt-4">
                    <p>Already have an account? <span className="text-link" onClick={() => setShowLogin(true)}>Sign In</span></p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Right Side – 3D Preview */}
        <div className="col-lg-7 d-none d-lg-block dashboard-preview p-0">
          <div className="blob blob1"></div>
          <div className="blob blob2"></div>
          <div className="blob blob3"></div>
          <spline-viewer
            url="https://prod.spline.design/JaqqhVOklzk6NfaJ/scene.splinecode"
            class="robot-3d"
          ></spline-viewer>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <button id="themeToggle" onClick={() => setDarkMode(!darkMode)} className="btn btn-outline-light theme-toggle-btn" aria-label="Toggle theme">
        <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
      </button>

      {/* Spline Viewer Script */}
      <script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.9.80/build/spline-viewer.js"
      ></script>
    </div>
  );
};

export default Home;
