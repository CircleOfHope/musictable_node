/**
 * Controllers are a simple set of action methods that will get pulled in to the Router
 * and mounted there. This prevents spreading route configuration across multiple files
 * and having to hunt them down. Actions are grouped into logical controllers.
 *
 * Controllers return a JS object with properties for each action.
 */
var Song = require('../models/song');
var Tag = require('../models/tag');
var Pager = require('../utils/pager');

var actions = {
	list: function(req, res) {
		var pager = new Pager({perPage: 50, page: req.query.page});

		var query = {
			limit: pager.perPage,
			offset: pager.offset,
			order: 'title ASC'
		}

		Song.findAndCountAll(query)
		.then(function(result){
			pager.paginate(result.count);	
			res.render('index.html', {songs: result.rows, pager: pager});
		});
	},
	search: function(req, res) {
		var pager = new Pager({perPage: 50, page: req.body.page});

		var query = {
			order: 'title ASC'
		}

		if (req.body.search) {
			search = req.body.search;
			searchString = "%" + search + "%";
			query.where = {
				$or: [
					{ title: { $like: searchString }},
					{ author: { $like: searchString }},
					{ firstLine: { $like: searchString }},
					{ keyLyric: { $like: searchString }}
				]
			}
		} 

		Song.findAndCountAll(query)
		.then(function(result){
			pager.paginate(result.count);	
			res.render('index.html', {songs: result.rows, pager: pager, search: search});
		});
	},
	detail: function(req, res) {
		Song.findById(req.params.id, {
			include: [
				Song.AttachmentAssc, // include attachment relations
				{association: Song.TagAssc, include: [Tag.TypeAssc]} //include tags and their tag types
			]})
		.then(function(song){
			res.render('detail.html', {song: song});
		});
	}
};

module.exports = actions;
