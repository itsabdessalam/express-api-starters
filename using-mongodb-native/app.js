const dotenv = require('dotenv').config(),
	bodyParser = require('body-parser'),
	createError = require('http-errors'),
	express = require('express'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	logger = require('morgan'),
	helmet = require('helmet'),
	database = require('./database/index'),
	app = express();

app.use(logger('dev'));
app.use(helmet());

// body-parser
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// database connection
database.connect(process.env.DB_URL);
// routes
app.use(require('./routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404, `Cannot ${req.method} ${req.originalUrl}`));
});

// error handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send(err.message);
});

module.exports = app;
