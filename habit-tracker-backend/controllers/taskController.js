// controllers/taskController.js
const Task = require("../models/Task");

exports.addTask = async (req, res) => {
  try {
    const { title, category, date, isRecurring, frequency, reminderTime } = req.body;
    const userId = req.user.id; 

    const task = new Task({
      title,
      category,
      date,
      isRecurring,
      reminderTime,
      frequency,
      user: userId,
    });

    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

// ✅ Get all tasks for logged-in user
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id; // comes from auth middleware

    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ tasks });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: err.message });
  }
};
