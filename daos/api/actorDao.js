const con = require('../../config/dbconfig') /*Imports database connection configuration */
const { queryAction } = require('../../helpers/queryAction')  /* Imports queryAction helper function */


const actorDao = { /* Defines the actor table */
    
    table: 'actor', /* stores the actor table as aproperty */
    

    /** FIND ACTOR BY LAST NAME **/
    findByLastName: (req, res)=> {  /* Declares a method that searches for actors using their last name */
        const { last_name} = req.params /* Retirve last name value from query string */
        const sql = `
        SELECT * 
        FROM actor 
        WHERE last_name = ?;` /* Defines parameterized sql query to select actor */

        con.query(sql, [last_name], (error, rows)=> { /* Executes sql query, last name injects the value into query */
            queryAction(res, error, rows, 'actor') /* Passes res, error, and query reslutss to helper func for output */
        })
    },

    /** GET ACTORS From PROGRAMS WITH A GIVEN PROGRAM TITLE **/
    findActorByProgramTitle: (req, res, table)=> { /* Defines a method to retrieve actors with programs rating */
        const title = req.params.title /* Initializes an empty array */
        /* Program-to-actor joins actor table with program */
        const sql = `
            SELECT a.* 
            FROM actor a            
            JOIN program_to_actor pa ON a.actor_id = pa.actor_id 
            JOIN program p ON pa.program_id = p.program_id
            WHERE p.title = ?;`
            
        con.execute(sql, [title], (error, rows) => { /* Execute sql statement, supplies rating as parameter array */
            queryAction(res, error, rows, table) /* Sends the results or error using helper function */
        })
    },

    /* SEARCH ACTORS BY PROGRAM_RATING => http://localhost:2025/api/actor/search/program_rating/PG-13 */
    findActorByProgram_rating: (res, table, column, value)=> {
        //const program_rating = req.params.value /* Gets ratng from url */

        /* Returns unique actor records along with the title and rating of the programs DISTINCT removes duplcate rows form the resulat and applies to all selectd columns together not just actor_id */
        const sql = `
            SELECT DISTINCT a.*, p.program_rating
            FROM actor a
            JOIN program_to_actor pa ON a.actor_id = pa.actor_id
            JOIN program p ON pa.program_id = p.program_id
            WHERE p.program_rating = ?;`

        con.execute(sql, [value], (error, rows)=> {
            queryAction(res, error, rows, table)
        })

    }, 

    /* FIND ALL PAGINATED IN ACTOR DAO */
    /* limit maximum number of rows to return for pagnination, offset number of rows to skip to fetch correct page */
    findAllPaginated: (req, res, table, limit, offset)=> { /* pagination returns only the required records instead of the entire table */
        /* Order by ensures the results are sorted by actor_id  */
        const sql = `
            SELECT * FROM ${table}
            ORDER BY actor_id LIMIT ? OFFSET ?;`

        connect.execute(sql, [limit, offset], (error, rows)=> {
            if (error) {
                return res.status(500).json({
                    error: true,
                    message: error.message
                })
            }
            queryAction(res, error, rows, table)
        })    

    },
    

    /*******POST CREATE ******/
    create: (req, res, table)=> { /* Inserts a new row into the database */
        //console.log(req)
        //res.send('complete')
        // req.body => {}

        if (Object.keys(req.body).length === 0) { /* Checks if request body is empty */
            //object.key(obj) => array of keys
            return res.json({
                "error": true,
                "message": "No fields to create"   /* Returns an error if no data was provided */
            })
        } else {
            const fields = Object.keys(req.body) /* Retrieves column names */
            const value = Object.values(req.body) /* Retrieves values */
            /* fields.join(' = ? ') -> builds the string f_name = ?, l_n = ? */
          connect.execute(
                `INSERT INTO ${table} 
                SET ${fields.join(' = ?, ')} = ?;`,
                value,
                (error, dbres)=> {
                    if (!error){
                       
                        /** instead of JSON response, render the success page */
                        console.log(dbres)
                        res.render('pages/success', {  /* Renders a success page */
                            title: 'Success',
                            name: 'Success',
                            last_id: dbres.insertId 
                        })
                    } else {
                        console.log(`${table}Dao error:`, error)
                        res.json({
                            error: true,
                            message: error.message
                        })
                    }
                }

            )

        }    
       
    },

    /******* UPDATE ******/
    update: (req, res, table)=> {

        if (isNaN(req.params.id)){ /* Checks if id is numerber */
            res.json({
                "error": true,
                "message": "Id must be a number"  /* Prevents invalid updates */
            })
        } else if (Object.keys(req.body).length == 0) {  /* Verify update dat exists */
            res.json({
                "error": true,
                "message": "No fields to update"
            })

        } else {

            const fields = Object.keys(req.body) /* Retrieves column names */
            const values = Object.values(req.body)  /* Retrieves values */

            connect.execute(
                `UPDATE ${table} SET  ${fields.join(' =?, ')} = ? WHERE ${table}_id = ?;`, 
                [...values, req.params.id],  /* Appends the ID to the parameter list */
                (error, dbres)=> {
                    if (!error) {
                        //res.send(`Changed ${dbres.changedRows} row(s)`)
                        res.json({
                            "status": 'updated',
                            "changedRows": dbres.changedRows /* Returns how many rows were updated */
                        })
                    } else {
                        res.json({
                            "error": true,
                            "message": error
                        })
                    }                        
                }
           )
        }
    }           
        
}

module.exports = actorDao