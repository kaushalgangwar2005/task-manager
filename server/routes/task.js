import express from "express";
import auth from "../middleware/authMiddleware.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { title, assignedTo, projectId } = req.body;

    if (!title || !assignedTo || !projectId) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    const isMember = project.members.some(
      (m) => m.toString() === req.user.id
    );

    if (!isMember) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    const task = await Task.create({
      title,
      user: req.user.id,
      assignedTo,
      project: projectId,
      status: "pending",
    });

    res.status(201).json(task);

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Error creating task" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
      .populate("assignedTo", "name email")
      .populate("project", "name");

    res.json(tasks);

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Error fetching tasks" });
  }
});

router.get("/project/:id", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.id })
      .populate("assignedTo", "name email")
      .populate("project", "name");

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ msg: "Error fetching project tasks" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/:id/status", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(task);

  } catch (err) {
    res.status(500).json({ msg: "Error updating status" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ msg: "Task deleted" });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;