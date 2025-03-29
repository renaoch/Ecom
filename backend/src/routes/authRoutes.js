const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/test", protect, (req, res) => {
  res.json("hwllo");
});
module.exports = router; // ✅ Keep this as the last line
