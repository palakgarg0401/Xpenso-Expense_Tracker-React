const pool = require("../config/db");

// ➕ Add Income
const addIncome = async (req, res) => {
  try {
    const { source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = await pool.query(
      "INSERT INTO incomes (user_id, source, amount, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.user.id, source, amount, date]
    );

    res.status(201).json(newIncome.rows[0]);
  } catch (err) {
    console.error("❌ Income add error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 📥 Get All Incomes
const getIncomes = async (req, res) => {
  try {
    const incomes = await pool.query("SELECT * FROM incomes WHERE user_id=$1", [req.user.id]);
    res.json(incomes.rows);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✏️ Update Income
const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { source, amount, date } = req.body;

    const updated = await pool.query(
      "UPDATE incomes SET source=$1, amount=$2, date=$3 WHERE id=$4 AND user_id=$5 RETURNING *",
      [source, amount, date, id, req.user.id]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ message: "Income not found or not authorized" });
    }

    res.json(updated.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ❌ Delete Income
const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await pool.query("DELETE FROM incomes WHERE id=$1 AND user_id=$2 RETURNING *", [
      id,
      req.user.id,
    ]);

    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: "Income not found or not authorized" });
    }

    res.json({ message: "Income deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { addIncome, getIncomes, updateIncome, deleteIncome };