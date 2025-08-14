// src/pages/Income.js
import React, { useState, useMemo, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../assets/css/style.css";
import "../assets/css/income.css";

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Salary",
    date: "",
  });

  const chartRef = useRef(null); // Reference for the canvas
  const chartInstanceRef = useRef(null); // Reference for Chart.js instance

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add income entry
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.category || !form.date) return;

    const newIncome = {
      ...form,
      amount: parseFloat(form.amount),
    };
    setIncomes((prev) => [...prev, newIncome]);
    setForm({
      description: "",
      amount: "",
      category: "Salary",
      date: "",
    });
  };

  // Prepare data for Chart.js
  const chartData = useMemo(() => {
    const categories = [
      "Salary",
      "Stock Investment",
      "Mutual Funds",
      "Dividend",
      "Other Sources",
    ];
    const data = categories.map((cat) =>
      incomes
        .filter((i) => i.category === cat)
        .reduce((sum, i) => sum + i.amount, 0)
    );

    return {
      labels: categories,
      datasets: [
        {
          label: "Income",
          data,
          backgroundColor: [
            "#36A2EB",
            "#FF6384",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
        },
      ],
    };
  }, [incomes]);

  // Render or update chart
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy old chart before creating a new one
    }
    if (chartRef.current) {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "pie",
        data: chartData,
      });
    }
  }, [chartData]);

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
          <h5 className="user-name" id="userName">
            User Name
          </h5>
        </div>
        <ul className="nav-menu px-3">
          <li className="nav-item">
            <a href="/dashboard">
              <i className="fas fa-th-large"></i> Dashboard
            </a>
          </li>
          <li className="nav-item active">
            <a href="#">
              <i className="fas fa-wallet"></i> Income
            </a>
          </li>
          <li className="nav-item">
            <a href="/expense">
              <i className="fas fa-money-check-alt"></i> Expense
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact">
              <i className="fas fa-headset"></i> Support
            </a>
          </li>
        </ul>
        <div className="logout-container mt-auto px-3">
          <button id="logoutBtn" className="btn btn-link logout-btn text-start">
            <a>
              <i className="fas fa-sign-out-alt"></i> Logout
            </a>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <button className="menu-toggle" id="menuToggle">
              <i className="fas fa-bars"></i>
            </button>
            <h2>Income Tracker</h2>
          </div>
          <div className="header-right">
            <button id="themeToggle" className="theme-toggle">
              <i className="fas fa-sun"></i>
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="row">
            {/* Left Section */}
            <div className="col-md-8">
              <div className="card summary-card">
                <div className="card-body">
                  <div className="addexpense">
                    <h2>Add New Income</h2>
                    <form className="expense-form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Description:</label>
                        <input
                          type="text"
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Amount (₹):</label>
                        <input
                          type="number"
                          name="amount"
                          step="0.01"
                          min="0"
                          value={form.amount}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Category:</label>
                        <select
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          required
                        >
                          <option value="Salary">Salary</option>
                          <option value="Stock Investment">Stock Investment</option>
                          <option value="Mutual Funds">Mutual Funds</option>
                          <option value="Dividend">Dividend</option>
                          <option value="Other Sources">Other Sources</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Date:</label>
                        <input
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <button type="submit">Add Income</button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="card chart-card">
                <div className="card-body">
                  <center>
                    <h3 className="headTitle">Income Breakdown</h3>
                  </center>
                  <canvas ref={chartRef} width="400" height="400"></canvas>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-md-4">
              <div className="card recent-transactions">
                <div className="card-body">
                  <h3>Recent Earnings</h3>
                  <ul className="transaction-list">
                    {incomes.slice(-5).map((inc, idx) => (
                      <li key={idx}>
                        {inc.description} - ₹{inc.amount} ({inc.category})
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-outline-primary btn-sm view-all">
                    Download Excel
                  </button>
                  <a
                    href="#"
                    className="btn btn-outline-primary btn-sm view-all"
                  >
                    View All Transactions
                  </a>
                </div>
              </div>

              <div className="card budget-card">
                <div className="card-body">
                  <h3>Budget Status</h3>
                  <div id="status">Coming soon...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Income;
