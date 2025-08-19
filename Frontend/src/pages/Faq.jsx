import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';
import '../assets/css/Faq.css';

const Faq = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : '';
  }, [darkMode]);

  const faqList = [
    {
      question: "What is Xpenso?",
      answer: "Xpenso is a personal finance tracker that helps you record, categorize, and monitor your income and expenses in one place. It allows users to record their income and expenses, categorize transactions (such as food, rent, transportation, and entertainment), and view summaries over specific time periods like daily, weekly, or monthly."
    },
    {
      question: "Is an expense tracker only for personal use?",
      answer: "No, expense trackers can be used by both individuals and businesses. While individuals track household expenses, businesses use them to manage operational and project-related costs."
    },
    {
      question: "Can I track expenses for multiple users or family members?",
      answer: "Yes, many expense trackers allow you to create shared accounts or invite other users to manage group or family budgets collaboratively."
    },
    {
      question: "How do I add an income entry?",
      answer: 'Go to Dashboard and then click on "Add Income" button, fill in the amount, category(e.g.,Mutual Funds,Stock Market), and date and Descriptions, then hit on Add Income and your income will be reflected in your total balance immediately on Dashboard.'
    },
    {
      question: "How do I add an expense entry?",
      answer: 'Go to Dashboard and then Click on "Add Expense," input the amount, category (e.g., Food, Bill), date, and Descriptions, then hit on Add Expense and then check on dashboard.'
    },
    {
      question: "Can I categorize my transactions?",
      answer: 'Yes, you can assign categories like "Food", "Transport", "Bills", "Shopping" or others.'
    },
    {
      question: "How do I view my monthly spending?",
      answer: "Go to the Dashboard section where you can find charts and summaries of your income vs. expenses for the selected month."
    },
    {
      question: "Can I track income and expenses in different currencies?",
      answer: "Currently, Xpenso supports your local currency. Multi-currency support is planned for a future update."
    },
    {
      question: "Is there a mobile version of Xpenso?",
      answer: "No! Xpenso is not a mobile version. A native app is also in development."
    },
    {
      question: "Why should I use an expense tracker?",
      answer: "Using an expense tracker helps you stay in control of your finances. It allows you to identify unnecessary expenses, stick to a budget, save more effectively, and achieve financial goals."
    },
    {
      question: "How can I share my expense data with an accountant or partner?",
      answer: "Most trackers let you export data in Excel, PDF, or CSV format, which can be easily shared. Some apps also offer shared wallets or team collaboration features."
    },
    {
      question: "Can I use an expense tracker for saving goals?",
      answer: "Yes, some trackers allow you to set financial goals (like saving for a trip or emergency fund) and track progress toward those goals."
    }
  ];

  return (
    <div className="faq-page">
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
          <li className="nav-item"><Link to="/dashboard"><i className="fas fa-th-large"></i> Dashboard</Link></li>
          <li className="nav-item"><Link to="/contact"><i className="fas fa-headset"></i> Support</Link></li>
          <li className="nav-item active"><Link to="/faq"><i className="fas fa-question"></i> Faq's</Link></li>
          <li className="nav-item"><Link to="/privacy"><i className="fas fa-building-shield"></i> Privacy Policy</Link></li>
        </ul>
        <div className="logout-container mt-auto px-3">
          <button id="logoutBtn" className="btn btn-link logout-btn text-start">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main>
        <header>
          <h2 align="center">Frequently Asked Questions</h2>
        </header>
        <div className="box">
          <section className="faq-section mb-3">
            {faqList.map((faq, index) => (
              <details key={index}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </section>
        </div>

        {/* Theme Toggle */}
        <div className="theme-toggle">
          <button
            id="themeSwitcher"
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            <i id="themeIcon" className={`fas ${darkMode ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Faq;