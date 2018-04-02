var mysql=require('mysql');
var connection = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'root',
  database:'posadmin'
});
 module.exports=connection;


// var mysql = require('mysql');
// var pool  = null;
// exports.connect = function() {
//   pool = mysql.createPool({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     database : 'posadmin'
//   });
// }
// exports.get = function() {
//   return pool;
// }