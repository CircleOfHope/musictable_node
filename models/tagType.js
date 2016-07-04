// TagType model

// load in the library for reference
var Sequelize = require('sequelize');
// get our sequelize connection
var db = require('./db');

// Define fields
var TagType = db.define('TagType', {
	name: {
		type: Sequelize.STRING, 
		validate: { notEmpty: true }
	}
});
module.exports = TagType;
// pull in the Tag model
var Tag = require('./tag');
// Tag Types have many tags
TagType.TagAssc = TagType.hasMany(Tag);