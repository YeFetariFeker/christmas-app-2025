const connect = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')
//const { search } = require('../../routes/router')

const daoCommon = {
    /* CREATE METHODS THAT WILL QUERY THE DATABASE */
    /******* FINDALL ******/
    findAll: (req, res, table)=> {

        /*.QUERY(TAKES TWO ARGUMENTS 1ST  SQL QUERY, 2ND CALLBACK FUNC) */
        connect.query(
            `SELECT * FROM ${table};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)               
                
            } 
        )         
    },

      
    /** FIND ACTOR BY PROGRAM RATING */
    findActorByProgramRating: (req, res, table)=> {

        /*.QUERY(TAKES TWO ARGUMENTS 1ST  SQL QUERY, 2ND CALLBACK FUNC) */
        connect.query(
            `SELECT * FROM ${table};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)               
                
            } 
        )         
    },

    /***** COUNTALL - counts all rows in a table ****/   
    countAll: (req, res, table) => {

        const sql = `SELECT COUNT(*) AS total FROM ${table};`
            connect.query(sql, (error, rows) => {
                queryAction(res, error, rows, table)
        })
    },
    
    /***** SEARCH *****/
    search: (res, table, column, value)=> {

        /** prevent SQL INJECTION in column name **/
        const allowedColumns = [ /**Add columns for each table **/
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
        if (!allowedColumns.includes(column)){
            return res.json({
                error: true,
                messge: `Invalid search column: ${column}`
            })
        }
        const sql = `SELECT * FROM ${table} WHERE ${column} LIKE ?;`

        connect.query(sql, [`%${value}%`],
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },


    /******* SORT ******/
    sort: (res, table, sorter)=> {
        
        connect.query(
            `SELECT * FROM ${table} ORDER BY  ${sorter};`,

            (error, rows)=> {
                queryAction(res, error, rows, table)
                                
            }
        )
    }, 

    /******* FINDBYID ******/
    findById: (res, table, id)=> {

        connect.query(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,

            (error, rows)=> {
                queryAction(res, error, rows, table)                
                
            }
        )
    },

          
    /*******POST CREATE ******/

    create: (req, res, table)=> {
        //console.log(req)
        //res.send('complete')
        // req.body => {}

        if (Object.keys(req.body).length === 0) {
            //object.key(obj) => array of keys
            return res.json({
                "error": true,
                "message": "No fields to create"
            })
        } else {
            const fields = Object.keys(req.body)
            const value = Object.values(req.body)

          connect.execute(
                `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ?;`,
                value,
                (error, dbres)=> {
                    if (!error){
                        // res.json({
                        //     last_id: dbres.insertId
                        // })
                        /** instead of JSON response, render the success page */
                        console.log(dbres)
                        res.render('pages/success', {
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

        //check if id == number
        if (isNaN(req.params.id)){
            res.json({
                "error": true,
                "message": "Id must be a number"
            })
        } else if (Object.keys(req.body).length == 0) {
            res.json({
                "error": true,
                "message": "No fields to update"
            })

        } else {

            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            connect.execute(
                `UPDATE ${table} SET  ${fields.join(' =?, ')} = ? WHERE ${table}_id = ?;`,

                [...values, req.params.id],
                (error, dbres)=> {
                    if (!error) {
                        //res.send(`Changed ${dbres.changedRows} row(s)`)
                        res.json({
                            "status": 'updated',
                            "changedRows": dbres.changedRows
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

