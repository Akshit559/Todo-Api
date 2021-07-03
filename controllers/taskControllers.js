const Task = require("../models/Task");

//Get Route
//@Desc :Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userID: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.log(error.message);
  }
};

//Post Route
//@Desc : Create Task
exports.createTasks = async (req, res) => {
  const { title, description } = req.body;
  try {
    var taskObj = {
      title: title,
      description: description,
      userID: req.user.id,
    };
    var task = new Task(taskObj);
    await task.save();
    res.json({ statusCode: 200, message: "Task Created", data: task });
  } catch (error) {
    console.log(error.message);
  }
};

//Put Route
//@Desc : Update Tasks
exports.updateTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    var NewObj = {
      title: title,
      description: description,
    };
    var task = await Task.findById(req.params.id);
    if (task) {
      var task = await Task.findOneAndUpdate(
        { _id: req.params.id },
        { $set: NewObj },
        { new: true }
      );
      return res.json({
        statusCode: 200,
        msg: "Task Updated ",
        data: task,
      });
    }
    return res.json({
      statusCode: 401,
      msg: "Enter a Valid ID",
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Delete Route
//@Desc : Delete the route by id
exports.deleteTask = async (req, res) => {
  try {
    var task = await Task.findById(req.params.id);
    if (task) {
      await Task.findOneAndDelete({ _id: req.params.id });
      return res.json({
        statusCode: 200,
        msg: "Task Deleted !",
      });
    }
    return res.json({
      statusCode: 401,

      msg: "Enter a Valid ID",
    });
  } catch (error) {
    console.log(error.message);
  }
};
