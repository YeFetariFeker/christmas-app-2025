const connect = require('../../config/dbconfig')

const daoCommon = {
    /* CREATE METHODS THAT WILL QUERY THE DATABASE */
    findAll: (req, res, table)=> {
        /*.QUERY(TAKES TWO ARGUMENTS 1ST  SQL QUERY, 2ND CALLBACK FUNC) */
        connect.query(
            `SELECT * FROM ${table};`,

            (error, rows)=> {
                //queryAction(res, error, rows, table)
                if (!error){
                    if (rows.lenght === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log(`Dao Error: ${error}`)
                    res.json({
                        "message": 'error',
                        'table': `${table}`,
                        'error': error
                    })

                }
                
            } 
        )
        
    },

    findById: (res, table, id)=> {

        connect.query(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,

            (error, rows)=> {
                //queryAction(res, error, rows, table)
                if (!error) {
                    res.json(...rows)
                    
                } else {
                    console.log(`DAO Error: ${error}`)
                    res.json({
                        "message": 'error',
                        'table': `${table}`,
                        'error': error
                    })
                }
            }
        )
    },

    sort: (res, table, sorter)=> {
        
        connect.query(
            `SELECT * FROM ${table} ORDER BY  ${sorter};`,

            (error, rows)=> {
                //queryAction(res, error, rows, table)
                if (!error) {
                    if (rows.length == 1) {
                        res.json(...rows)
                    } else{
                        res.json(rows)
                    }
                } else {
                    console.log(`DAO Error: ${error}`)
                    res.json({
                        "message": 'error',
                        'table': `${table}`,
                        'error': error
                    })
                }
            }
        )
    }

}

module.exports = daoCommon

