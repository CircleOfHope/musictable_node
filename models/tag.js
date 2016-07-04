// Tag model

// load in the library for reference
var Sequelize = require('sequelize');
// get our sequelize connection
var db = require('./db');

// Define fields
var Tag = db.define('Tag', {
	name: {
		type: Sequelize.STRING, 
		validate: { notEmpty: true }
	},
	TagTypeId: {
		type: Sequelize.INTEGER,
		references: {
			model: TagType
		}
	}
});
// export the model before defining relationships
module.exports = Tag;
// pull in the Song model
var Song = require('./song');
var TagType = require('./TagType');
// Tags have a tag type
Tag.TypeAssc = Tag.belongsTo(TagType);
// Song can have many Tags
Tag.SongAssc = Tag.belongsToMany(Song, {through: 'SongTags'});
