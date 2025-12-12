const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')


const streaming_platformDao = {
    
    table: 'streaming_platform',  /** database table */

    /** FIND BY STREAMING ID**/
     findById: (res, id) => {
        const sql = `SELECT * FROM streaming_platform WHERE streaming_platform_id = ?;`;
        con.query(sql, [id], (error, rows) => queryAction(res, error, rows, 'streaming_platform'));
    },

    /** FIND BY STREAMIN NAME**/
    findByName: (req, res) => {
        const { name } = req.query;
        const sql = `SELECT * FROM streaming_platform WHERE streaming_platform = ?;`;
        con.query(sql, [name], (error, rows) => queryAction(res, error, rows, 'streaming_platform'));
    },

   
    /** GET STREAMING PLATFORM PROGRAMS WITH A GIVEN PROGRAM RATING **/
    findStreamingPlatformByProgramRating: (req, res)=> {
        const {rating } = req.query

        const sql = `SELECT sp.* FROM streaming_platform sp
        JOIN program_to_streaming_platform ps ON sp.streaming_platform_id = ps.streaming_platform_id
        JOIN program p ON ps.streaming_platform_id = ps.streaming_platform_id
        WHERE p.rating = ?;`

        con.query(sql, [rating], (error, rows)=> {
            queryAction(res, error, rows, 'streaming_platform')
        })

    },

    
}



module.exports = streaming_platformDao