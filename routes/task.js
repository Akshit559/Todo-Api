const taskController = require("../controllers/taskControllers");
const auth = require("../middleware/auth");
const router = require("express").Router();

//Get Route
//Get all routes of log
router.get("/all", auth, taskController.getAllTasks);

router.post("/create-task", auth, taskController.createTasks);

router.put("/update-task/:id", auth, taskController.updateTask);

router.delete("/delete-task/:id", auth, taskController.deleteTask);
module.exports = router;
