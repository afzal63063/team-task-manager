const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");


router.get("/", auth, async (req, res) => {
  const tasks = await Task.find()
    .populate("assignedTo", "name")
    .populate("project", "name"); 

  res.send(tasks);
});

router.post("/", auth, async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.send(task);
});


router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.send(task);
});


router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;