//sqlite3
const sqlite3 = require('sqlite3').verbose();
let sql;

//connect to DB
const db = new sqlite3.Database("./models.db", sqlite3.OPEN_READWRITE,(err)=>{
  if (err) return console.error(err.message);
})

module.exports = db