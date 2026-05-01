const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// CREATE PROJECT (Admin only)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Only Admin can create project" });
    }

    const project = new Project({
      name: req.body.name,
      createdBy: req.user.id,
    });

    await project.save();
    res.json(project);

  } catch (err) {
    res.status(500).json({ message: "Error creating project" });
  }
});

// GET PROJECTS
router.get("/", auth, async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

module.exports = router;