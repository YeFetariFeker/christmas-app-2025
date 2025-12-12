const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction');
const { findDirectorByProgramRating } = require('../common/daoCommon');

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
        

}    

module.exports = programDao
