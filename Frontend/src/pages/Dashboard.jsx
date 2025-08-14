import React, { useEffect, useRef, useState } from "react";
import "../assets/css/style.css";
import "../assets/css/dashboard.css";
import { Chart } from "chart.js/auto";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  const expenseChartRef = useRef(null);
  const incomeChartRef = useRef(null);

  //Store chart instances
  const expenseChartInstance = useRef(null);
  const incomeChartInstance = useRef(null);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      setDarkMode(true);
    }

    // Destroy existing charts before creating new ones
    if (expenseChartInstance.current) {
      expenseChartInstance.current.destroy();
    }
    if (incomeChartInstance.current) {
      incomeChartInstance.current.destroy();
    }

    // Expense Chart
    if (expenseChartRef.current) {
      expenseChartInstance.current = new Chart(expenseChartRef.current, {
        type: "doughnut",
        data: {
          labels: ["Food", "Travel", "Bills"],
          datasets: [
            {
              data: [300, 200, 100],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        },
      });
    }

    // Income Chart
    if (incomeChartRef.current) {
      incomeChartInstance.current = new Chart(incomeChartRef.current, {
        type: "bar",
        data: {
          labels: ["Salary", "Investments", "Other"],
          datasets: [
            {
              label: "Income",
              data: [2000, 500, 200],
              backgroundColor: "#36A2EB",
            },
          ],
        },
      });
    }

    // Cleanup charts on unmount
    return () => {
      if (expenseChartInstance.current) {
        expenseChartInstance.current.destroy();
      }
      if (incomeChartInstance.current) {
        incomeChartInstance.current.destroy();
      }
    };
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="dashboard-container">
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
          <h5 className="user-name">User Name</h5>
        </div>
        <ul className="nav-menu px-3">
          <li className="nav-item active"><a href="#"><i className="fas fa-th-large"></i> Dashboard</a></li>
          <li className="nav-item"><a href="/income"><i className="fas fa-wallet"></i> Income</a></li>
          <li className="nav-item"><a href="/expense"><i className="fas fa-money-check-alt"></i> Expense</a></li>
          <li className="nav-item"><a href="/contact"><i className="fas fa-headset"></i> Support</a></li>
        </ul>
        <div className="logout-container mt-auto px-3">
          <button className="btn btn-link logout-btn text-start">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <button className="menu-toggle">
              <i className="fas fa-bars"></i>
            </button>
            <h2>Dashboard</h2>
          </div>
          <div className="header-right">
            <button className="theme-toggle" onClick={toggleTheme}>
              <i className={darkMode ? "fas fa-moon" : "fas fa-sun"}></i>
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="row">
            <div className="col-md-8">
              {/* Monthly Summary */}
              <div className="card summary-card">
                <div className="card-body">
                  <h3>Monthly Summary</h3>
                  <div className="summary-stats">
                    <div className="stat-item">
                      <span className="stat-label">Income</span>
                      <span className="stat-value income">₹0.00</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Expenses</span>
                      <span className="stat-value expenses">₹0.00</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label savings">Savings</span>
                      <span className="stat-value savings">₹0.00</span>
                      <span className="stat-change positive">+0%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expense Chart */}
              <div className="card chart-card">
                <div className="card-body">
                  <h3>Expense Breakdown</h3>
                  <canvas ref={expenseChartRef}></canvas>
                </div>
              </div>

              {/* Income Chart */}
              <div className="card chart-card">
                <div className="card-body">
                  <h3>Earnings Breakdown</h3>
                  <canvas ref={incomeChartRef}></canvas>
                </div>
              </div>
            </div>

            {/* Right Side Content */}
            <div className="col-md-4">
              {/* Recent Transactions */}
              <div className="card recent-transactions">
                <div className="card-body">
                  <h3>Recent Transactions</h3>
                  <ul className="transaction-list"></ul>
                  <button className="btn btn-outline-primary btn-sm view-all">
                    Download Excel
                  </button>
                  <a href="#" className="btn btn-outline-primary btn-sm view-all">
                    View All Transactions
                  </a>
                </div>
              </div>

              {/* Top Categories */}
              <div className="card top-categories-card">
                <div className="card-body">
                  <h3>Top 3 Spending Categories (Past Month)</h3>
                  <div id="top-categories" className="top-categories-list"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Dashboard;