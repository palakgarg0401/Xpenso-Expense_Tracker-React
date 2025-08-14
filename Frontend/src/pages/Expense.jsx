// src/pages/ExpensePage.jsx
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "../assets/css/style.css";
import "../assets/css/expense.css";

export default function ExpensePage() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [transactions, setTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Food",
    date: "",
  });

  // Example demo chart data
  const chartData = {
    labels: ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Other"],
    datasets: [
      {
        label: "Expenses",
        data: [500, 300, 150, 200, 400, 100],
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffcd56",
          "#4bc0c0",
          "#9966ff",
          "#ff9f40",
        ],
      },
    ],
  };

  // Render chart
  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "bar", // Converted to bar chart
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = { ...formData, amount: parseFloat(formData.amount) };
    setTransactions((prev) => [newExpense, ...prev]);
    setAllTransactions((prev) => [newExpense, ...prev]);
    setFormData({ description: "", amount: "", category: "Food", date: "" });
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar (unchanged) */}
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
          <li className="nav-item">
            <a href="/dashboard">
              <i className="fas fa-th-large"></i> Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a href="/income">
              <i className="fas fa-wallet"></i> Income
            </a>
          </li>
          <li className="nav-item active">
            <a href="#">
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
            <h2>Expense Tracker</h2>
          </div>
          <div className="header-right">
            <button className="theme-toggle">
              <i className="fas fa-sun"></i>
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="row">
            <div className="col-md-8">
              {/* Add Expense Form */}
              <div className="card summary-card">
                <div className="card-body">
                  <div className="addexpense">
                    <h2>Add New Expense</h2>
                    <form onSubmit={handleSubmit} className="expense-form">
                      <div className="form-group">
                        <label>Description:</label>
                        <input
                          type="text"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Amount (₹):</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.amount}
                          onChange={(e) =>
                            setFormData({ ...formData, amount: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Category:</label>
                        <select
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                          }
                          required
                        >
                          <option value="Food">Food</option>
                          <option value="Transport">Transport</option>
                          <option value="Entertainment">Entertainment</option>
                          <option value="Bills">Bills</option>
                          <option value="Shopping">Shopping</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Date:</label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          required
                        />
                      </div>
                      <button type="submit">Add Expense</button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Expense Chart */}
              <div className="card chart-card">
                <div className="card-body" style={{ height: "400px" }}>
                  <center>
                    <h3 className="headTitle">Expense Breakdown</h3>
                  </center>
                  <canvas ref={chartRef}></canvas>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="col-md-4">
              {/* Recent Transactions */}
              <div className="card recent-transactions">
                <div className="card-body">
                  <h3>Recent Transactions</h3>
                  <ul className="transaction-list">
                    {transactions.map((t, i) => (
                      <li key={i}>
                        {t.description} - ₹{t.amount} ({t.category})
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-outline-primary btn-sm view-all">
                    Download Excel
                  </button>
                  <a href="#" className="btn btn-outline-primary btn-sm view-all">
                    View All Transactions
                  </a>
                </div>
              </div>

              {/* Budget Status */}
              <div className="card budget-card">
                <div className="card-body">
                  <h3>Budget Status</h3>
                  <div id="status"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
