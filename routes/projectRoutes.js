const express = require("express");
const router = express.Router();

const {
  getProjects,
  createProject,
  deleteProject,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

// Public - shown on portfolio site
router.get("/", getProjects);

// Private - admin manages projects
router.post("/", protect, createProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
