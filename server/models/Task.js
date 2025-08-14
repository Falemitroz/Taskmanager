const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Task = sequelize.define("Task", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING },
  description:{ type: DataTypes.TEXT },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  taskListId: { type: DataTypes.UUID, allowNull: false }
});

// Definizione delle associazioni
Task.associate = (models) => {
  Task.belongsTo(models.TaskList, {
    foreignKey: "taskListId",
    onDelete: "CASCADE"
  });
};

module.exports = Task;
