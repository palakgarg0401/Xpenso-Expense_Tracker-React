const pool = require("../config/db");

// ➕ Add Expense
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = await pool.query(
      "INSERT INTO expenses (user_id, title, amount, category, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req.user.id, title, amount, category, date]
    );

    res.status(201).json(newExpense.rows[0]);
  } catch (err) {
    console.error("❌ Expense add error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 📥 Get All Expenses of Logged-in User
const getExpenses = async (req, res) => {
  try {
    const expenses = await pool.query("SELECT * FROM expenses WHERE user_id=$1", [req.user.id]);
    res.json(expenses.rows);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✏️ Update Expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, date } = req.body;

    const updated = await pool.query(
      "UPDATE expenses SET title=$1, amount=$2, category=$3, date=$4 WHERE id=$5 AND user_id=$6 RETURNING *",
      [title, amount, category, date, id, req.user.id]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ message: "Expense not found or not authorized" });
    }

    res.json(updated.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ❌ Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await pool.query("DELETE FROM expenses WHERE id=$1 AND user_id=$2 RETURNING *", [
      id,
      req.user.id,
    ]);

    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: "Expense not found or not authorized" });
    }

    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { addExpense, getExpenses, updateExpense, deleteExpense };