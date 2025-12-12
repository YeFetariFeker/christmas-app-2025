const express = require('express')
const router = express.Router()

const { programDao: dao} = require('../../daos/dao')


/**GET ALL PROGRAMS =>  HTTP://LOCALHOST:2025/API/PROGRAM **/
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table)

})

/** FIND BY PROGRAM FORMAT**/
router.get('/format/:format', (req, res)=> {
    dao.findByFormat(res, dao.table, req.params.format)
})

/** COUNT ALL program */
router.get('/count', (req, res) => {    
    dao.countAll(req, res, dao.table)  
})

/** SEARCH PROGRAM BY TITLE => http://localhost:2025/api/program/search/title/Home%20Alone **/
router.get('/search/:column/:value', (req, res)=> {
    const { column, value} = req.params
    dao.search(res, dao.table, column, value)
})



/** GET PROGRAM BY PRODUCTION_ID => http://localhost:2025/api/program/production_id/7  **/
router.get('/production_id/:id', (req, res) => {
    const id = req.params.id;
    dao.findProgramByProductionId(req, res, dao.table, id);
});


/** SORT PROGRAM BY RATING  =>  HTTP://LOCALHOST:2025/API/PROGRAM/RATING */
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})


/**** CREATE A NEW PROGRAM *****/
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

/**** UPDATE A PROGRMA *****/ 
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

/** FIND PROGRAM BY ID /** CATCH ALL - MUST BE LAST =>  HTTP://LOCALHOST:2025/API/:ID  **/
router.get('/id/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})


module.exports = router