const router = require('express').Router()
//const { countAll } = require('../../daos/common/daoCommon'); // import method
const { productionDao: dao} = require('../../daos/dao')


/**GET ALL PRODUTION => HTTP://LOCALHOST:2025/API/ACTOR **/
router.get('/', (req, res)=> {    
    dao.findAll(req, res, dao.table)
})

/** FIND PRODUCTION BY RATING => http://localhost:2025/api/production/program/rating/PG-13 **/
router.get('/rating', (req, res)=> {
    dao.findByRating(req, res, dao.table)
})

/** COUNT ALL PROGRAMS */
router.get('/count', (req, res) => {    
    dao.countAll(req, res, dao.table)  /*count all rows in program table */
})
/** uniq findBy */
/** uniq finby */


/** SEARCH FUCNTION -> http://production/search/:col/:value **/
router.get('/search/:col/:value', (req, res)=> {
    const { col, value} = req.params
    dao.search(res, dao.table, col, value)
})

/* HTTP://LOCALHOST:2025/API/ACTOR/:ID */ /* SORT ACTORS BY COLUMN */
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)

})

/* HTTP://LOCALHOST:2025/API/:ID*/  /* GET ACTOR BY ID */
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

/*http://loclahost:2025/api/actor/create*/ /**** CREATE ACTOR*****/
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})


/**** UPDATE *****/
router.patch('/update', (req, res)=> {
    dao.update(req, res, dao.table)
})

/*NEED TO ADD */
//ROUTER.GET COUNTALL, SEARCH

module.exports = router
