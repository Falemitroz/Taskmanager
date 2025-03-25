const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // Usa solo la connessione, non la crea

const basename = path.basename(__filename);
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Associa i modelli se necessario
  }
});

db.sequelize = sequelize; // La connessione è già presente in sequelize
db.Sequelize = Sequelize;

module.exports = db;
