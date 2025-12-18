const router = require('express').Router()  /* Imports Express and creates a new router instance */
const { actorDao: dao} = require('../../daos/dao') /* Import actorDao from dao.js for routes to communicate with dao */


/** DEFINES A GET ROUTE for  SEARCH ACTORS BY SPECIFC COLUMN AND VALUE  **/
router.get('/search/:col/:value', (req, res)=> {
    const column = req.params.col  /* Declare col(program_rating) */
    const value = req.params.value  /* Declare url value(PG-13) */

    /* VALIDATE COLUMN TO AVOID SQL INJECTION */
    const allowedColumns = [  /* Define which columns are allowd to be queried */
        'program_rating', 'title', 'format' /* a security mesure to prevent SQL injection attacks */
    ]
    console.log('SEARCH ROUTE HIT', column, value)
    if (!allowedColumns.includes(column)){  /* Checks if the requested colum is valid if not return 400 with an error */
        return res.status(400).json({  
            error: true, 
            message: `Invlaid column: ${column}`
        })        
    }
    dao.findActorByProgram_rating(res, dao.table, column, value) /* pass to DAO */
})

/* GET FIND ACTOR BY PROGRAM TITLE */
router.get('/title/:title', (req, res)=> { /* Fetch actors that appear in a specific program by its title */
    dao.findActorByProgramTitle(req, res, dao.table)
})

/* GET ROUTE TO FInd ACTORS BY LAST NAME*/
router.get('/last_name/:last_name', (req, res)=> {
    dao.findByLastName(req, res)
})

/** GET ROUTE TO COUNT ALL ACTOR IN DB */
router.get('/count', (req, res) => {
    dao.countAll(req, res, 'actor')  /*count all from the DAO rows specifically  in actor table */
})

/* GET SORT ACTORS BY COLUMN */ /* http://localhost:2025/api/actor/:id */ 
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

/* GET All ACTOR */ 
router.get('/', (req, res)=> {    /* GET route to retrieve all actors from db */
    dao.findAll(req, res, dao.table)
})

/* GET ALL ACTOR WITH PAGINATION */
router.get('/', (req, res)=> {
    const page = parseInt(req.query.page) || 3
    const limit = parseInt(req.query.limit) || 7
    const offset = (page - 1) * limit

    dao.findAllPaginated(req, res, dao.table, limit, offset)
})

/* GET FIND ACTOR BY ID (('/:id') MUST BE AT THE BUTTOM OF GET ROUTE) */ 
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

 /**** POST ROUTE TO CREATE NEW ACTOR*****/ 
router.post('/create', (req, res)=> {
    dao.create(req, res, 'actor')  /* Calls dao.create with the request  */
})

/****** PATCH ROUTE TO UPDATE AN ACTOR BY ID *****/ 
router.patch('/update/:id', (req, res)=> { /* Place last to prevent it from catching other roues  like /count or /sort */
    dao.update(req, res, 'actor')  /* Call dao.update to modifiy actor's info in db */
})

module.exports = router

