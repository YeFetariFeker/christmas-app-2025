const con = require('../../config/dbconfig')  /* Imports db connection config */
const { queryAction } = require('../../helpers/queryAction')  /* Import a helper func queryAction */


const directorDao = {  /* Declares an obj directorDao that will contain all methods to interact with direcot table */
    
    table: 'director',  /* Stores table name as a property */

    /*** FIND DIRECTOR BY PROGRAM YEAR RELEASED ***/
    findDirectorByProgramYrReleased: (req, res)=> {  /* Declares a method that finds directors associated whit programs*/

       const year = req.query.year || '1990'
       
       /* SQL query to find directors for programs realesed in 1990 linking table for many-to-many relationship */
       const sql = `
       SELECT DISTINCT d.*, p.yr_released
       FROM director d
       JOIN program_to_director pd ON d.director_id = pd.director_id
       JOIN program p ON pd.program_id = p.program_id
       WHERE p.yr_released = ?;`

       con.execute(sql, [year], (error, rows)=> {
            queryAction(res, error, rows, 'director')  /* Calls queryAction to handle response */   
       }) 
    },  

    /** FIND  DIRECTORS BY PROGRAM RATING **/
    findDirectorByProgramRating: (req, res)=> { /* Method to get direcotrs whose programs have pecifc rating PG-13 ...*/
        const { rating } = req.query
        /* SQL query to find directors for program_rating PG-13... linking table for many-to-many relationship */
        const sql = `
            SELECT d.*
            FROM director d
            JOIN program_to_director pd ON d.director_id = pd.director_id
            JOIN program p ON pd.program_id = p.program_id
            WHERE p.rating = ?;`
            
            con.query(sql, [rating], (error, rows) => {
            queryAction(res, error, rows, 'director')
        })
    },

    /** FIND DIRECTOR BY FIRST NAME **/
    findByDirectorFirstName: (req, res)=> {
        const { first_name} = req.query
        const sql = `SELECT * FROM director WHERE first_name = ?;` /* SQL query selects * directors matching firstName */
        con.query(sql, [first_name], (error, rows)=> {
            queryAction(res, error, rows, 'director')
        })
    }    
}

module.exports = directorDao