
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('views', __dirname + '/views');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/*', routes.partials);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

app.listen(8080);
console.log("Listeing on http://localhost:8080");