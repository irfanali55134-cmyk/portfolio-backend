const express = require("express");
const router = express.Router();

const {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} = require("../controllers/contactController");

const { protect } = require("../middleware/authMiddleware");

// Public - visitor submits contact form
router.post("/", createContact);

// Private - admin views/manages messages
router.get("/", protect, getContacts);
router.put("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteContact);

module.exports = router;
