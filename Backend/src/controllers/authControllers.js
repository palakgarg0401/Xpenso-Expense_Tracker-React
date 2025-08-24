const bcrypt = require("bcrypt"); //for hashing & verifying passwords
const jwt = require("jsonwebtoken"); //generating JWT token 
const pool = require("../config/db.js"); //PostgreSQL connection

// Register User
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (typeof password !== "string") {
      return res.status(400).json({ message: "Password must be a string" });
    }

    const userExists = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered", user: newUser.rows[0] });
  }  catch (err) {
  console.error("❌ Register error stack:", err); // full object
  res.status(500).json({ message: "Server error", error: err.message });}
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Debug logs
    console.log("Login request: ", req.body);

    // Find user
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("DB user: ", user.rows[0]);

    // Compare password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT {jwt.sign(payload, secret, expires_in)}
    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
  console.error("❌ Login error stack:", err); 
  res.status(500).json({ message: "Server error", error: err.message });}
};

// Profile (Protected)
const profile = async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id=$1",
      [req.user.id]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ CommonJS export
module.exports = { register, login, profile };