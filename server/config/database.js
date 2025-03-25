const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("taskmanager", "sandro", null, {
    host: "localhost",
    dialect: "postgres"
});
module.exports = sequelize