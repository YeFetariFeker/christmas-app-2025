const connect = require('../../config/dbconfig') /*Imports db */
const { queryAction } = require('../../helpers/queryAction') /*Imports a helper fnctin queryAction */
//const { search } = require('../../routes/router')

const daoCommon = {
    /* CREATE METHODS THAT WILL QUERY THE DATABASE */
    /******* FINDALL ******/
    findAll: (req, res, table)=> { /* findAll fetch data from database */

        /* .QUERY(TAKES TWO ARGUMENTS 1ST  SQL QUERY, 2ND CALLBACK FUNC) */
        connect.query(
            `SELECT * FROM ${table};`,  /* SQL query that selects all col and row from specifc table */
            (error, rows)=> {
                queryAction(res, error, rows, table)               
                
            } 
        )         
    },

          
    /***** COUNTALL:  counts all rows in a table ****/   
    countAll: (req, res, table) => {

        const sql = `SELECT COUNT(*) AS total FROM ${table};` 
            connect.query(sql, (error, rows) => {  /* Executes the count query */
                queryAction(res, error, rows, table)  /* Sends the count result */
        })
    },
    
    /***** SEARCH *****/
    search: (res, table, column, value)=> {  /* Searchs a table by a column and value */

        /** prevent SQL INJECTION in column name **/
        const allowedColumn = [ /**Add columns for each table **/
            'streaming_platform_name', 
            'streaming_platform_id',
            'title', 
            'yr_released',
            'runtime',
            'production_id',
            'format',
            'program_rating',
            'rating',
            'img_url',
            'description'
        ]

        /** VALIDATE IF THE COLUMN NAME IS ALLOWED **/
        if (!allowedColumn.includes(column)){
            return res.json({  /* Stops execution and sends an error response */
                error: true,
                message: `Invalid search column: ${column}`
            })
        }
        const sql = `SELECT * FROM ${table} WHERE ${column} LIKE ?;`

        connect.query(sql, [`%${value}%`],
            (error, rows)=> {
                queryAction(res, error, rows, table)  /* Sends search resluts */
            }
        )
    },


    /******* SORT ******/
    sort: (res, table, sorter)=> { /* Sorts records by the given column */
        
        connect.query(
            `SELECT * FROM ${table} ORDER BY  ${sorter};`,

            (error, rows)=> {
                queryAction(res, error, rows, table)
                                
            }
        )
    }, 

    /******* FINDBYID ******/
    findById: (res, table, id)=> { /* Retrieves single record by its ID */

        connect.query(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,

            (error, rows)=> {
                queryAction(res, error, rows, table)                
                
            }
        )
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

module.exports = daoCommon

