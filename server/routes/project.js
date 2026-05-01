import express from "express";
import auth from "../middleware/authMiddleware.js";
import Project from "../models/Project.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.id,
      members: [req.user.id]
    });

    res.json(project);
  } catch {
    res.status(500).json({ msg: "Error creating project" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id
    });

    res.json(projects);
  } catch {
    res.status(500).json({ msg: "Error fetching projects" });
  }
});

export default router;