/**
 * Base Router for the app.
 *
 * Rather than spread routes across a handful of files, never sure which one contains
 * the route you need, we are defining all routes here, and simply pulling in controller
 * functions for each route. 
 *
 * This module will return an Express Router with all routes attached. The main app will
 * mount it at "/".
 */
var express = require('express');
var router = express.Router();
var table = require('../controllers/table');

// public music table
router.get('/', table.list);
router.post('/', table.search);
router.get('/song/:id', table.detail);

module.exports = router;