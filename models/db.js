// This file initializes a sequelize connection and returns it for use
// in defining models and syncing our connecting

var Sequelize = require("sequelize");
var dbConfig 	= require('../config/database')[process.env.NODE_ENV || 'development'];
var database 	= new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password);

module.exports = database;