// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["work", "personal", "health", "study", "other"],
      default: "personal",
    },
    date: {
      type: Date,
      required: true,
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    reminderTime: {
      type: String, // Example format: "14:00"
    },
    frequency: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
