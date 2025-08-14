const Sequelize = require("sequelize");
const sequelize = require("../config/database");

// Importa i modelli
const Task = require("./Task");
const TaskList = require("./TaskList");

// Associazioni
TaskList.associate({ Task });
Task.associate({ TaskList });

// Oggetto db per esportare tutto
const db = {
  sequelize,
  Sequelize,
  Task,
  TaskList
};

module.exports = db;
