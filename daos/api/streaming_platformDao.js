const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')


const streaming_platformDao = {
    
    table: 'streaming_platform',  /** database table */

    
     /** FIND STREAMING PLATFORM BY NAME */
    findByName: (req, res) => {
        const { name } = req.params; // Access name from URL params, not query

        console.log(`Searching for streaming platform by name: ${name}`); // Debugging line

        const sql = `SELECT * FROM streaming_platform WHERE streaming_platform = ?`; // Correct column name
        con.query(sql, [name], (error, rows) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({ error: 'Database error', message: error.message });
            }
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Not Found', message: `No platform found with name: ${name}` });
            }
            queryAction(res, error, rows, 'streaming_platform');
        });
    },


     /** FIND ALL STREAMING PLATFORM BY PROGRAM RATING **/
    findStreamingByName: (res, table, streamingName) => {
        const sql = `SELECT p.* FROM program p WHERE p.streamingName = ?;`
        connect.query(sql, [streamingName], (error, rows) => {
            queryAction(res, error, rows, table)
        })
    },

    
    /** GET STREAMING PLATFORM PROGRAMS WITH A GIVEN PROGRAM RATING **/
    findStreamingPlatformByProgramRating: (req, res)=> {
        const {rating } = req.query

        const sql = `SELECT sp.* FROM streaming_platform sp
        JOIN program_to_streaming_platform ps ON sp.streaming_platform_id = ps.streaming_platform_id
        JOIN program p ON ps.program_id = p.program_id
        WHERE p.program_rating = ?;` // program_rating field

        con.query(sql, [rating], (error, rows)=> {
            queryAction(res, error, rows, 'streaming_platform')
        })

    }   
    
}

module.exports = streaming_platformDao