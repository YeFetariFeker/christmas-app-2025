const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')


const directorDao = {
    
    table: 'director',

    /** GET DIRECTORS FOr PROGRAMS WITH A GIVEN PROGRAM RATING **/
    findDirectorByProgramRating: (req, res)=> {
        const { rating } = req.query

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
        const sql = `SELECT * FROM director WHERE first_name = ?;`
        con.query(sql, [first_name], (error, rows)=> {
            queryAction(res, error, rows, 'director')
        })
    },

    
}
 /**findBy, findBY... */

module.exports = directorDao