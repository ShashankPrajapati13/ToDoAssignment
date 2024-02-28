const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
        // Removed 'task' association from here, will be defined separately
    }, {
        timestamps: true,
        paranoid:true
    });

    // Hash password before saving
    User.beforeCreate(async (user, options) => {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 12);
        }
    });

    // Instance method to generate token
    User.prototype.generateToken = function() {
        return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    };

    // Instance method to compare password
    User.prototype.comparePassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    User.associate = function(models) {
        User.hasMany(models.Task, {
          foreignKey: 'userId',
          as: 'tasks'
        });
      };
    

    return User;
};
