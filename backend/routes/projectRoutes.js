const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      createdBy: req.user.id
    });

    await project.save();
    res.send(project);

  } catch (err) {
    res.status(500).send("Error creating project");
  }
});

router.get("/", auth, async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.send("Project deleted");
  } catch (err) {
    res.status(500).send("Delete failed");
  }
});

module.exports = router;