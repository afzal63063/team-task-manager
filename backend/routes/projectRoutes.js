const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  if (req.user.role !== "Admin")
    return res.status(403).send("Only admin");

  const project = new Project({
    name: req.body.name,
    createdBy: req.user.id
  });

  await project.save();
  res.send(project);
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