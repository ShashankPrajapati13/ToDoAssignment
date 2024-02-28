const { Sequelize } = require('sequelize');

// Set up a new Sequelize instance
const sequelize = new Sequelize('todolist', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('DB connected');
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });


const User = require('../schemas/userSchema')(sequelize);
const Task = require('../schemas/taskSchema')(sequelize);




module.exports = {
    sequelize,
    User,
    Task
};
