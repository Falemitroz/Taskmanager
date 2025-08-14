const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TaskList = sequelize.define("TaskList", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false }
});

TaskList.associate = (models) => {
  TaskList.hasMany(models.Task, {
    foreignKey: "taskListId",
    onDelete: "CASCADE"
  });
};

module.exports = TaskList;
