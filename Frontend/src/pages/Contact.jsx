import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';
import '../assets/css/contact.css';

const Contact = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactDetails: '',
    message: ''
  });

  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : '';
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can add backend submission logic here (e.g., using fetch or axios)
    setFormData({ name: '', email: '', contactDetails: '', message: '' });
  };

  return (
    <div className="contact-page">
      {/* Theme Toggle */}
      <div className="theme-toggle-container">
        <button
          id="themeToggle"
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          <i className={`fas ${darkMode ? 'fa-moon' : 'fa-sun'}`}></i>
        </button>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container text-center py-3">
          <h2 className="logo">Xpenso</h2>
        </div>
        <div className="text-center my-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
            alt="Avatar"
            className="avatar-img mb-2"
          />
          <h5 className="user-name" id="userName">User Name</h5>
        </div>
        <ul className="nav-menu px-3">
          <li className="nav-item">
            <Link to="/dashboard"><i className="fas fa-th-large"></i> Dashboard</Link>
          </li>
          <li className="nav-item active">
            <Link to="/contact"><i className="fas fa-headset"></i> Support</Link>
          </li>
          <li className="nav-item">
            <Link to="/faq"><i className="fas fa-question"></i> Faq's</Link>
          </li>
          <li className="nav-item">
            <Link to="/privacy"><i className="fas fa-building-shield"></i> Privacy Policy</Link>
          </li>
        </ul>
        <div className="logout-container mt-auto px-3">
          <button className="btn btn-link logout-btn text-start">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container">
        <div className="left">
          <h3 className="heading">Get In Touch</h3>
          <p className="text">We are here for you! How can we help?</p>
          <form id="contactForm" onSubmit={handleSubmit} noValidate>
            <div className="inputBox">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="inputBox">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="inputBox">
              <input
                type="text"
                name="contactDetails"
                placeholder="Enter your contact details"
                required
                value={formData.contactDetails}
                onChange={handleChange}
              />
            </div>
            <div className="inputBox">
              <textarea
                name="message"
                placeholder="Enter your message..."
                required
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button className="submit-btn" type="submit">Submit</button>
          </form>
        </div>

        <div className="right">
          <div className="illustration">
            <img
              id="illustration-img"
              src="https://img.freepik.com/premium-vector/lady-call-center-illustration-with-headphones-computer-speech-balloon-showing-message-woman-using-laptop-earphones-with-conversation-bubble-presenting-explanation_424947-8749.jpg"
              alt="Illustration showing communication"
            />
          </div>
          <div className="contact-info">
            <div className="infoBox">
              <div className="icon"><ion-icon name="location"></ion-icon></div>
              <div className="text"><span>Chitkara University</span></div>
            </div>
            <div className="infoBox">
              <div className="icon"><ion-icon name="call"></ion-icon></div>
              <div className="text"><a href="tel:8054969067">8054969067</a></div>
            </div>
            <div className="infoBox">
              <div className="icon"><ion-icon name="mail"></ion-icon></div>
              <div className="text"><a href="mailto:ronak1114.be23@chitkara.edu.in">ronak1114.be23@chitkara.edu.in</a></div>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="social-icons">
          <a href="https://www.facebook.com/profile.php?id=100068643819655"><ion-icon name="logo-facebook"></ion-icon></a>
          <a href="https://x.com/xpensoapp"><ion-icon name="logo-twitter"></ion-icon></a>
          <a href="#"><ion-icon name="logo-linkedin"></ion-icon></a>
        </div>
      </div>
    </div>
  );
};

export default Contact;