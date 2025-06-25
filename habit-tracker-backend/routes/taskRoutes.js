const express = require("express");
const router = express.Router();
const { addTask,getTasks  } = require("../controllers/taskController");
// const auth = require("../middleware/auth");
const auth = require("../middleware/authMiddleware");


router.post("/add", auth, addTask);

router.get("/list", auth, getTasks);

module.exports = router;
