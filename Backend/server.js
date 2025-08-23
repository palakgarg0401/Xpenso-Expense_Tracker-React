const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const authRoutes = require("./src/routes/authRoutes");
const incomeRoutes = require("./src/routes/incomeRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);

// Root endpoint (optional test)
app.get("/", (req, res) => {
  res.send("Xpenso Backend API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));