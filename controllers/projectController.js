const Project = require("../models/Project");

// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching projects" });
  }
};

// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const { title, description, image, github, live, technologies } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Project title is required" });
    }

    let techArray = [];

    if (Array.isArray(technologies)) {
      techArray = technologies.map((t) => t.trim()).filter(Boolean);
    } else if (typeof technologies === "string") {
      techArray = technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const project = await Project.create({
      title,
      description,
      image,
      github,
      live,
      technologies: techArray,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error creating project" });
  }
};

// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error deleting project" });
  }
};

module.exports = { getProjects, createProject, deleteProject };
