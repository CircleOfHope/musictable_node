// Song model
// TODO: Indexes for faster searching

// load in the library for reference
var Sequelize = require('sequelize');
// get our sequelize connection
var db = require('./db');

// Define fields
var Song = db.define('Song', {
	title: { 
		type: Sequelize.STRING, 
		validate: { notEmpty: true } 
	},
	author: Sequelize.STRING, 
	scripture: Sequelize.STRING, 
	firstLine: Sequelize.STRING(500),
	keyLyric: Sequelize.STRING(500),
	notes: Sequelize.STRING(500),
	quarantined: { 
		type: Sequelize.BOOLEAN, 
		allowNull: false, 
		defaultValue: false 
	}
});
// export the model before defining relationships
module.exports = Song;
// pull in the Tag model
var Tag = require('./tag');
var Attachment = require('./attachment');
// Tag can have many Songs
Song.TagAssc = Song.belongsToMany(Tag, {through: 'SongTags'});
Song.AttachmentAssc = Song.hasMany(Attachment);