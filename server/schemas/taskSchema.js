const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Task = sequelize.define('Task', {
        taskName: {
            type: DataTypes.STRING
        },
        taskDes: {
            type: DataTypes.STRING
        },
        userId: {
          type: DataTypes.INTEGER
      }
        
    }, {
        timestamps: true,
        paranoid:true

    });

    Task.associate = function(models) {
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    };

    return Task;
};
