const dotenv = require("dotenv").config(),
  createError = require("http-errors"),
  express = require("express"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  mongoose = require("mongoose"),
  helmet = require("helmet"),
  app = express();

app.use(logger("dev"));
// security
app.use(helmet());

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// database connection
mongoose.connect(
  process.env.DB_URL,
  { useCreateIndex: true, useNewUrlParser: true },
  error => {
    if (error) {
      throw error;
    }
    console.log("🚀 Successfully connected to database !");
  }
);
// routes
app.use(require("./routes"));

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
