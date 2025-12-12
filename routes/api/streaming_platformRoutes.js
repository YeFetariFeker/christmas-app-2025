const express = require('express')
const router = express.Router()

const { streaming_platformDao: dao} = require('../../daos/dao') /*imports dao */

/** GET ALL =>  HTTP://LOCALHOST:2025/API/STREAMING_PLATFORM **/
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table)

})

/** uniq findBy */
/** uniq finby */

/** SEARCH STREAMING_PLATFORM BY NAME  => http://streaming_platform/search/name/Netflix **/
router.get('/search/:column/:value', (req, res)=> {
    const { column, value} = req.params
    dao.search(res, dao.table, column, value) /* CALLS THE SEARCH METHOD IN DAO */
})

/** SORT HTTP://LOCALHOST:2025/API/streaming_platform/name **/
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

/** DET BY ID HTTP://LOCALHOST:2025/API/:ID  **/
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

/**** CREATE *****/
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

/**** UPDATE *****/
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router