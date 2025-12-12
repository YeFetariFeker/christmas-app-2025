const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction');

const programDao = {

    table: 'program',  

   findProgramByProductionId: (req, res, table, id) => {
        const sql = `
            SELECT title, yr_released, program_id, runtime, production_id, format, program_rating,rating, img_url, description
            FROM ${table} 
            WHERE production_id = ?;`

        con.query(sql, [id], (error, rows) => {
            queryAction(res, error, rows, table)        
        })
     
    },

    findByRating: (res, table, rating)=> {
        const sql = `SELECT * FROM ${table} WHERE rating = ?;`
        con.query(sql, [rating], (error, rows)=> {
            queryAction(res, error, rows, table)
        })
    },

    findByFormat: (res, table, format)=> {
        const sql = `SELECT * FROM ${table} WHERE format = ?;`
        con.query(sql, [format], (error, rows)=> {
            queryAction(res, error, rows, table)
        })
    },

    findProgramByYr_released: (req, res, table)=> {

       const query = req.query ? req.query : {} 
       const yr_released = query.year || '2003'

       const sql = `SELECT * FROM ${table} WHERE yr_released = ${yr_released};`

       con.execute(sql, (error, rows)=> queryAction(res, error, rows, 'program'))

    }

    
        

}    

module.exports = programDao
