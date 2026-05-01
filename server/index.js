import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import authMiddleware from "./middleware/authMiddleware.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/project.js";
import taskRoutes from "./routes/task.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

// routes
app.use("/api/auth", authRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    msg: "You are authorized ",
    user: req.user
  });
});

// DB connect
mongoose.connect("mongodb+srv://kaushal22scse1010459_db_user:Kaushal833@cluster0.2umfjib.mongodb.net/taskmanager")
  .then(() => console.log("DB connected"))
  .catch(err => console.log("DB ERROR:", err));

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0' ,  () => {
  console.log(`Server running on port ${PORT}`);
});