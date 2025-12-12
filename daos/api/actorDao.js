const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')


const actorDao = {
    
    table: 'actor',
    

    /** FIND ACTOR BY LAST NAME **/
    findByLastName: (req, res)=> {
        const { last_name} = req.query
        const sql = `SELECT * FROM actor WHERE last_name = ?;`
        con.query(sql, [last_name], (error, rows)=> {
            queryAction(res, error, rows, 'actor')
        })
    },

    /** GET DIRECTORS FOr PROGRAMS WITH A GIVEN PROGRAM RATING **/
    findActorByProgramRating: (req, res, table)=> {
        const { rating } = req.query

        const sql = `
            SELECT a.*
            FROM actor a
            JOIN program_to_actor pa ON a.actor_id = pa.actor_id
            JOIN program p ON pa.program_id = p.program_id
            WHERE p.rating = ?;`
            
            con.query(sql, [rating], (error, rows) => {
            queryAction(res, error, rows, 'actor')
        })
    }

   
    
}



module.exports = actorDao