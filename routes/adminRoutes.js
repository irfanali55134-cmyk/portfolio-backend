const express = require("express");
const router = express.Router();

const { loginAdmin } = require("../controllers/authController");
const { getProfile, updateProfile } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");

// Auth
router.post("/login", loginAdmin);

// Profile
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;
