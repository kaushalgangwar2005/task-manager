import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending"
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  }

}, { timestamps: true });

export default mongoose.model("Task", taskSchema);