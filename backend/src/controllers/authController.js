const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const protection = require('../middleware/authMiddleware')

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }



    // ✅ Save user
    const user = await User.create({ name, email, password });
    generateToken(res, user._id);
    res.status(201).json({
      message: "User registered successfully",

      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(user.password, password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    generateToken(res, user._id);
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", error });
  }
};


module.exports = { registerUser, loginUser };
