const con = require('../../config/dbconfig')  /* Import db connection obh(con) from dbconfig file to communicat sql */
const { queryAction } = require('../../helpers/queryAction') /* import helper fun querAction */


const streaming_platformDao = {  /* Declare an obj spDao that will contain all methods interacting in db */
    
    table: 'streaming_platform',  /** database table */

    /* FIND STREAMING_PLATFORM BY PROGRAM YR_RELEASED */

    findStreamingByProgramYrReleased: (req, res)=> { /* Defines method to get sp's that have programs realeased in certain year */

       const year = req.query.year || '2000'  /* Reads the yr query parameter from URL if not provide defaults to 2000 */
        /* Joins 3 tables s_p, the linking table program_to_s_p, and program and use ? a placeholder for year */
       const sql = `
       SELECT DISTINCT s.*, p.yr_released
       FROM streaming_platform s
       JOIN program_to_streaming_platform ps 
        ON s.streaming_platform_id = ps.streaming_platform_id
       JOIN program p 
        ON ps.program_id = p.program_id
       WHERE p.yr_released = ?;`

       con.execute(sql, [year], (error, rows)=> { /* Excute SQL query suing db connection, passes year as parameter */
            queryAction(res, error, rows, 'streaming_platform')        
       })       

    },

    
     /** FIND STREAMING PLATFORM BY NAME */
    findByPlatform: (req, res) => {
        const { platform } = req.params // Access name from URL params, not query platform(same parameter in routes)

        console.log(`Searching for streaming platform by name: ${platform}`) // Debugging line

        const sql = `SELECT * FROM streaming_platform WHERE streaming_platform = ?` // Correct column name
        con.query(sql, [platform], (error, rows) => {
            if (error) {
                /* Executes the query safely using ? placeholder, if db err occuers, logs it and sends a 500 internal server error response */
                console.error('Database error:', error)
                return res.status(500).json({ error: 'Database error', message: error.message })
            }
            if (rows.length === 0) { 
                /* If no matching rows are found sends a 404 Not Found response with a message */
                return res.status(404).json({ error: 'Not Found', message: `No platform found with name: ${name}` })
            }
            /* If rows are found calls querAction to format and send the results to the client */
            queryAction(res, error, rows, 'streaming_platform')
        })
    },

    /** GET SEARCH STREAMING BY RATING **/
    searchStreamingByRating: (req, res, rating)=> { /* Defines method to get s_p that host programs of a certain rating*/
        //const {rating } = req.query
        /* Construct SQL to join the trhee tables and filter programs by rating. DISTINCT(ensures no duplecate s_p are returned) */
        const sql = `
        SELECT DISTINCT s.*, p.rating
        FROM streaming_platform s
        JOIN program_to_streaming_platform ps ON s.streaming_platform_id = ps.streaming_platform_id
        JOIN program p ON ps.program_id = p.program_id
        WHERE p.rating = ?;` // rating field

        con.execute(sql, [rating], (error, rows)=> { /* Execute query with the rating parameter */
            queryAction(res, error, rows, 'streaming_platform') /* Calls queryAction to handle the response */
        })
    }     
}

module.exports = streaming_platformDao