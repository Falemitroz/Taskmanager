const { Sequelize } = require("sequelize");

let sequelize;

console.log("NODE_ENV:", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(
    "taskmanager",
    "sandro",
    null,
    {
      host: "localhost",
      dialect: "postgres"
    }
  );
} else {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./dev-database.sqlite",
    logging: false
  });
}

module.exports = sequelize;
