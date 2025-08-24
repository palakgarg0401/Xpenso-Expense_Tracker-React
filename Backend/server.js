const express = require("express"); //framework for backend API
const dotenv = require("dotenv"); //loads environment variables from .env file
const cors = require("cors"); //middleware that allow backend and frontend to talk

dotenv.config(); //load the key-value pair into process.env

//importing the routes
const authRoutes = require("./src/routes/authRoutes");
const incomeRoutes = require("./src/routes/incomeRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");

const app = express(); //app is backend server instance

// Middleware
app.use(cors());
app.use(express.json()); //Parsing all incoming requests with JSON body

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