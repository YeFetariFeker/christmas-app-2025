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

    /** GET DIRECTORS FOrom PROGRAMS WITH A GIVEN PROGRAM RATING **/
    findActorByProgramRating: (req, res, table)=> {
        const rating = []

        const sql = `
            SELECT a.*
            FROM actor a
            JOIN program_to_actor pa ON a.actor_id = pa.actor_id
            JOIN program p ON pa.program_id = p.program_rating
            WHERE p.program_rating = ?;`
            
            con.execute(sql, rating, (error, rows) => {
            queryAction(res, error, rows, table)
        })
    }
  
    
}



module.exports = actorDao