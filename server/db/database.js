const { Sequelize } = require("sequelize");
const connectionString = process.env.DATABASE_URL;
const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const User = require("../schemas/userSchema")(sequelize);
const Task = require("../schemas/taskSchema")(sequelize);

module.exports = {
  sequelize,
  User,
  Task,
};
