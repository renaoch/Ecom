const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded");
    console.log("decoded", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = { protect };
