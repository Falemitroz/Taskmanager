const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Task = sequelize.define("Task", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    userId: { type: DataTypes.UUID, allowNull: false }
    }
);


Task.belongsTo(User, { foreignKey: "userId" });

module.exports = Task;