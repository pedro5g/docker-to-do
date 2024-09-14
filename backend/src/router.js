const express = require("express");
const tasksController = require("./controllers/tasksController");
const tasksMiddleware = require("./middlewares/tasksMiddleware");
const router = express.Router();

// router.get("/", tasksController.site);
router.get("/tasks", tasksController.getAll);
router.post("/tasks", tasksMiddleware.validateTitle, tasksController.addTask);
router.delete("/tasks/:id", tasksController.deleteTask);
router.put(
  "/tasks/:id",
  tasksMiddleware.validateTitle,
  tasksController.updateTask
);

module.exports = router;
