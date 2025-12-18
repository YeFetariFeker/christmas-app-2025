const con = require('../../config/dbconfig') /* Imports database connection  to run sql queries=> con mysql object */
const { queryAction } = require('../../helpers/queryAction') /* Imports a helper fun (queryAction)  */

const programDao = { /* creates a programDao object */

    table: 'program',  /* stores database table name */
    /* Finds programs by produciton id */
   findProgramByProductionId: (req, res, table, id) => {
        /* Creates SQL query where ? is a placeholder for sage input that prevent SQL injection */
        const sql = `
            SELECT title, yr_released, program_id, runtime, production_id, format, program_rating,rating, img_url, description
            FROM ${table} 
            WHERE production_id = ?;`

        con.query(sql, [id], (error, rows) => {  /* Excutes sql query replace ? with id */
            queryAction(res, error, rows, table)   /* Sends the result or error back to clinet */
        })
     
    },

    findByRating: (res, table, rating)=> {
        /* Select all progrmas whre rating matches input */
        const sql = `SELECT * FROM ${table} WHERE rating = ?;`
        con.query(sql, [rating], (error, rows)=> {
            queryAction(res, error, rows, table)
        })
    },

    findByFormat: (res, table, format)=> { /* Finds programs by format (animation, live-action...)) */
        const sql = `SELECT * FROM ${table} WHERE format = ?;`
        con.query(sql, [format], (error, rows)=> {
            queryAction(res, error, rows, table)
        })
    },

    findProgramByYr_released: (req, res, table)=> { /* Finds programs by yrRleased */

       const query = req.query ? req.query : {} /* Gets querey parameters from URL if not exist, use empty obj */
       const yr_released = query.year || '2003'

       const sql = `SELECT * FROM ${table} WHERE yr_released = ${yr_released};`

       con.execute(sql, (error, rows)=> queryAction(res, error, rows, 'program'))

    }   
        

}    

module.exports = programDao
