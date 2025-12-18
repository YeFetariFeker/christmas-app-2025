const router = require('express').Router()
//const { countAll } = require('../../daos/common/daoCommon'); // import method
const { directorDao: dao} = require('../../daos/dao')

/* HTTP://LOCALHOST:2025/API/ACTOR */ /* GET All ACTOR */
router.get('/', (req, res)=> {    
    dao.findAll(req, res, dao.table)
})

/** FIND PDIRECTOR BY RATING => 
 * http://localhost:2025/api/director/program/rating/PG-13 **/
router.get('/rating', (req, res)=> {
    dao.findDirectorByProgramRating(req, res, dao.table)
})

/** COUNT ALL ACTOR */
router.get('/count', (req, res) => {    
    dao.countAll(req, res, 'director')  /*count all rows in actor table */
})

/* FIND DIRECTOR BY PROGRAM YR_RELEASED => http://localhost:2025/api/director/year?year=1990  */
router.get('/year', (req, res)=> {
    dao.findDirectorByProgramYrReleased(req, res)
})

/** SEARCH FUCNTION -> http://director/search/:col/:value **/
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


module.exports = router
