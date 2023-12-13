var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//MongoDB
var mongoose = require('mongoose')

// ******** LOCAL DATABASE *********
var mongoDB = 'mongodb://127.0.0.1:27017/website'

// ********** ATLAS DATABASE  **********
//var mongoDB = 'mongodb+srv://UserABB-1:240ABBweb@website.xnh22b2.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoDB)
// mongoose.connect(mongoDB,{
//   serverSelectionTimeoutMS: 5000
// }).catch(err => console.log(err.reason));
var db = mongoose.connection
db.on('error', console.error.bind(console,'MongoDB connection error:'));

//DeprecationWarning disable
//mongoose.set('useFindAndModify', false)

//Routes
var indexRouter = require('./routes/index');
const expressEjsLayouts = require('express-ejs-layouts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '/public')));
// Function to serve all static files
// inside public directory.
app.use(express.static('public')); 
app.use('/images', express.static('images'));
app.use('/fonts', express.static('fonts'));

// Router setup
app.use('/', indexRouter);

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
