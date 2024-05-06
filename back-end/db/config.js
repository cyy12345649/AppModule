const mysql = require('mysql')

const connectdb=()=>{
  var connection = mysql.createConnection({     
    host     : 'localhost',       
    user     : 'manager',              
    password : '123456789',       
    port: '3306',                   
    database: 'tradeable_license_database' 
})
  return connection;
}
module.exports=connectdb;
