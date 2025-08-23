// Expense Controllers

// Add new expense
const addExpense = (req, res) => {
  res.json({ message: "Expense added successfully (dummy)" });
};

// Get all expenses
const getExpenses = (req, res) => {
  res.json({ message: "Fetching expenses (dummy)" });
};

// Delete an expense
const deleteExpense = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Expense with id ${id} deleted (dummy)` });
};

module.exports = { addExpense, getExpenses, deleteExpense };