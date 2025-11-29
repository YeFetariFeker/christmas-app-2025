/* BUILD A CONNECTION TO THE DATABASE */
const mysql = require('mysql2')  /* importing mysql2*/

const pool = mysql.createPool({  /* create a pool */
    connectionLimit: 10,
    host: 'localhost',
    user: 'root1',
    password: 'root',
    database: 'christmasdb'
})    

/* EXPORT  */
module.exports = pool