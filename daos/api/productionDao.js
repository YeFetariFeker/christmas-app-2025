const con = require('../../config/dbconfig')  /* Import db connection */
const { queryAction } = require('../../helpers/queryAction') /* Import hlper function querAction */


const productionDao = { /* Declares an obj productionDao that will contain all methods to interact with direcot table */
    
    table: 'production',


     /** GET PRODUCTION RATING BASED ON PROGRAM RATING **/
    findByRating: (req, res, table)=> {
        
        const query = req.query ? req.query : {} /* If user sent query params use them otherwise use an empty obj */

        const rating = query.rating || null  /* Extracts rating from URL if not there sets it to null */

        let sql = '' /* Declares variable to stroe SQL query */

        if (rating != null) { /* Checks if rating was provded */

            /* Joins production and program table and filters prodcution by program rating */
            sql = `SELECT pr.* FROM production pr
            JOIN program p ON pr.production_id = p.production_id
            WHERE p.rating = ${rating};`

        } else { /* Else returns all productions that is sorts by production name */
            sql = `SELECT pr.* FROM production pr
            JOIN program p USING (production_id) ORDER BY pr.production;`
        }

        con.execute(sql, (error, rows)=> { /* Executes SQL query */
            console.log(rows)
            queryAction(res, error, rows, 'production')
        })

    },

    /** FIND PRODUCTION BY NAME => http:localhost:2025/api/production/name  **/
    findByProductionName: (req, res)=> {
        const { production_name} = req.query
        const sql = `SELECT * FROM production WHERE production = ?;`
        con.execute(sql, [production_name], (error, rows)=> {
            queryAction(res, error, rows, 'production')
        })
    }  
    
}

module.exports = productionDao


