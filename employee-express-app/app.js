var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var companyArrayRouter = require('./routes/companyarray');
var companyMySQLRouter = require('./routes/companymysql');
var companyMongodbRouter=require('./routes/companymongodb');






var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());  //to parse the data sent in JSON format
app.use(express.urlencoded({ extended: false }));  //to parse the data in url-encoded format

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/companyarray', companyArrayRouter);

app.use("/companymysql",companyMySQLRouter);
app.use("/companymongodb",companyMongodbRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
