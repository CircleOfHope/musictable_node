var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
// create the express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
var env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});
env.addFilter('displayLink', function(link){
  return link.split("://")[1].split("/")[0];
});
// returns 10 page numbers to display in pagination,
// starting from current page or total pages - 10. 
// also always include first and last page numbers
env.addFilter('pageRange', function(pager){
  var pages = [];
  var rangeMax, rangeMin;
  rangeMax = Math.min(pager.totalPages-1, pager.page + 9);
  rangeMin = Math.max(2, rangeMax - 9);
  pages.push(1);
  for (var i = rangeMin; i <= rangeMax; i++) {
    pages.push(i);
  }
  pages.push(pager.totalPages);
  return pages;
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// mount all routes, see config/router.js
app.use('/', require('./config/router'));

// Note: DB and model bootstrapping happens in models/index.js

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.html', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
