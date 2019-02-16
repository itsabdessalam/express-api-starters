const dotenv = require('dotenv').config(),
	bodyParser = require('body-parser'),
	createError = require('http-errors'),
	express = require('express'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	logger = require('morgan'),
	mongoose = require('mongoose'),
	helmet = require('helmet'),
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
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// mongoose connection
mongoose.connect(process.env.DB_URL, { useCreateIndex: true, useNewUrlParser: true }, (error) => {
	if (error) {
		throw error;
	}
});
// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
