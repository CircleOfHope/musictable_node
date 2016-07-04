// Attachment model

// load in the library for reference
var Sequelize = require('sequelize');
// get our sequelize connection
var db = require('./db');

// Define fields
var Attachment = db.define('Attachment', {
	name: Sequelize.STRING,
	location: {
		type: Sequelize.STRING(500),
		validates: { isUrl: true }
	},
	SongId: {
		type: Sequelize.INTEGER,
		references: {
			model: Song
		}
	}
});
// export the model before defining relationships
module.exports = Attachment;
// pull in the Song module
var Song = require('./song');
// Attachment belongs to a Song
Attachment.SongAssc = Attachment.belongsTo(Song);