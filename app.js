var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//sqlite3
const sqlite3 = require('sqlite3').verbose();
let sql;

//connect to DB
const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE,(err)=>{
  if (err) return console.error(err.message);
})
//Create table DO THIS ONCE THEN COMMENT OUT
 //sql = 'CREATE TABLE models(id INTEGER PRIMARY KEY,model_number,description,photo)'
 //db.run(sql)

// HOW TO drop table
//db.run("DROP TABLE users")

//insert date into table
//  sql = 'INSERT INTO models(model_number,description,photo) VALUES (?,?,?)'
// db.run(sql,["ds200dcfb","power supply","dcfb.jpeg"],(err)=>{
//   if (err) return console.error(err.message);
// })

//update data
// sql = 'UPDATE users SET first_name = ? WHERE first_name = ?';
// db.run(sql,['Richard','mike'],(err)=>{
//   if (err) return console.error(err.message);
// })

//query the data
sql = 'SELECT * FROM models'
db.all(sql,[],(err,rows) => {
  if (err) return console.error(err.message);
  rows.forEach(row=>{
    console.log(row)
  })
})






//MongoDB
// var mongoose = require('mongoose')

// ******** LOCAL DATABASE *********
// var mongoDB = 'mongodb://127.0.0.1:27017/website'

// ********** ATLAS DATABASE  **********
//var mongoDB = 'mongodb+srv://UserABB-1:240ABBweb@website.xnh22b2.mongodb.net/?retryWrites=true&w=majority'

// mongoose.connect(mongoDB)
// mongoose.connect(mongoDB,{
//   serverSelectionTimeoutMS: 5000
// }).catch(err => console.log(err.reason));
// var db = mongoose.connection
// db.on('error', console.error.bind(console,'MongoDB connection error:'));

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
  res.locals.banner = banner
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
