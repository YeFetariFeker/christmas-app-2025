const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')


const productionDao = {
    
    table: 'production',


     /** GET PRODUCTION FRO PROGRAMS WITH A GIVEN PROGRAM RATING **/
    findByRating: (req, res, table)=> {
        
        const query = req.query ? req.query : {}

        const rating = query.rating || null

        let sql = ''

        if (rating != null) {
            sql = `SELECT pr.* FROM production pr
            JOIN program p ON pr.production_id = p.production_id
            WHERE p.rating = ${rating};`

        } else {
            sql = `SELECT pr.* FROM production pr
            JOIN program p USING (production_id) ORDER BY pr.production;`
        }


        con.execute(sql, (error, rows)=> {
            console.log(rows)
            queryAction(res, error, rows, 'production')
        })

    },

    /** FIND DIRECTOR BY ID  http:localhost:2025/api/production/name  **/
    findByProductionByName: (req, res)=> {
        const { director_id} = req.query
        const sql = `SELECT * FROM actor WHERE director_id = ?;`
        con.execute(sql, [director_id], (error, rows)=> {
            queryAction(res, error, rows, 'director_id')
        })
    }

     
}


module.exports = productionDao