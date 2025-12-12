const router = require('express').Router()
//const { countAll } = require('../../daos/common/daoCommon'); // import method
const { actorDao: dao} = require('../../daos/dao')

/* HTTP://LOCALHOST:2025/API/ACTOR */ /* GET All ACTOR */
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table)

})

router.get('/actor_rating', (req, res)=> {
    dao.findActorByProgramRating(req, res, dao.table)

})

/** COUNT ALL ACTOR */
router.get('/count', (req, res) => {
    dao.countAll(req, res, 'actor')  /*count all rows in actor table */
})

/** SEARCH FUCNTION -> http://actor/search/:col/:value **/
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

/**** UPDATE ACTOR BY ID *****/ // if not working remove /:id from router.patch'/update/:id'
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

/*NEED TO ADD */
//ROUTER.GET COUNTALL, SEARCH

module.exports = router

