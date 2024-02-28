
const { User, Task, sequelize } = require('../db/database');
const { sendToken } = require('../utils/Auth');
const bcrypt = require('bcryptjs');

exports.Slashpage = function (req, res, next) {
  res.json("this is / page");
}

exports.CreateUser = async function (req, res, next) {
  try {
    const { username, password, email } = req.body;
    
    const user = await User.create({
      email,
      username,
      password 
    });
    sendToken(user, 201, res); // Ensure sendToken is adapted for Sequelize
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.LoginUser = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json("user not registered");
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(401).json("Invalid Credentials");
    }

    sendToken(user, 200, res); // Updated status code to 200
  } catch (err) {
    res.status(500).json(err.message);
  }
};


exports.logOutUser = async (req, res, next) => {
  res.clearCookie("token")
  res.json({ message: "logout succesfully!" })
}

exports.CreateTask = async function (req, res, next) {
  try {
    const { taskName, taskDes } = req.body;
    const user = req.user;

    var task = await Task.create({
      taskName,
      taskDes,
      userId: user.id, // Use 'userId' instead of 'user'
    });

    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.userTasks = async function (req, res, next) {
  try {
    const user = req.user;
    const tasks = await Task.findAll({
      where: { userId: user.id }
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.allTasks = async function (req, res, next) {
  try {
    var tasks = await Task.findAll({
      include: [{ model: User, as: 'user' }]
    });
    res.json({ tasks });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.deleteTask = async function (req, res, next) {
  try {
    let taskId = req.params.plc;
    var deleteTask = await Task.destroy({
      where: { id: taskId }
    });
    res.json({ success: true, deletedTaskId: taskId });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.editTask = async function (req, res, next) {
  try {
    let taskId = req.params.plc;
    var updatedTask = await Task.update(req.body, {
      where: { id: taskId }
    });
    res.json({ success: true, updatedTask });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.homePage = async function (req, res, next) {

  const user = req.user;

  // // console.log(user)

  res.send("this is home page");
}


exports.createDB = async (req, res) => {
  try {
    await sequelize.sync({ force: true }); // This will drop the tables if they exist and create them again
    res.status(201).json("Database and tables created");
  } catch (err) {
    res.status(500).json(err.message);
  }
};


//CREATE TABLE
exports.createTable = async (req, res) => {
  try {
      await sequelize.sync({ force: true }); // This will drop existing tables and recreate them
      res.send('Tables created successfully');
    } catch (error) {
      console.error('Error creating tables:', error);
      res.status(500).send('Error creating tables');
    }
}



