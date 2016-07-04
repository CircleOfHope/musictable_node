// Bootstrap our models to our DB connection

// get our sequelize connection
var db = require('./db');

// Simply require any model we wish to load and it will be 
// defined and added to our db sequelize instance
require('./song');
require('./tag');
require('./tagType');
require('./attachment');

module.exports = db;