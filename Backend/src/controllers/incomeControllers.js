// Income Controllers

// Add new income
const addIncome = (req, res) => {
  res.json({ message: "Income added successfully (dummy)" });
};

// Get all incomes
const getIncomes = (req, res) => {
  res.json({ message: "Fetching incomes (dummy)" });
};

// Delete an income
const deleteIncome = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Income with id ${id} deleted (dummy)` });
};

module.exports = { addIncome, getIncomes, deleteIncome };