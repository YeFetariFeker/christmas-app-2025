const express = require('express')
const router = express.Router()

const { streaming_platformDao: dao} = require('../../daos/dao') /*imports dao */

/** SEARCH STREAMING_PLATFORM BY NAME  **/
router.get('/search/rating/:value', (req, res)=> { /* route url /search/rating:value */
    const rating = req.params.value
    dao.searchStreamingByRating(req, res, rating) /* CALLS THE SEARCH METHOD IN DAO */
})

/** GET ALL =>  http://localhost:2025/api/streaming_platform **/
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table)
})

/** GET STREAMING PLATFORM BY NAME  **/
router.get('/by_platform/:platform', (req, res) => { /* platform route parameter(req.prams.platform) */
    dao.findByPlatform(req, res); // pass req and res to the dao
})

/** GET COUNT ALL S_P */
router.get('/count', (req, res) => {
    dao.countAll(req, res, 'streaming_platform')  /*count all rows in actor table */
})

/* FIND STREAMING_PLATFORM BY PROGRAM YR_RELEASED => http://localhost:2025/api/streaming_platform/year?year=1990  */
router.get('/year', (req, res)=> {
    dao.findStreamingByProgramYrReleased(req, res)
})


/**FIND PROGRAM BY STREAMING PLATFORM **/
router.get('/get_program/:id', (req, res)=> {
    dao.findProgramByStreaming_platform(res, dao.table, req.params.id)
})

/** Find streaming platforms by program rating */
router.get('/by_rating/:rating', (req, res) => {
    const rating = req.params.rating;  // Get the rating from the URL parameter
    dao.findByProgramRating(req, res, dao.table, rating);  // Call the DAO method with rating
});



/** SORT  **/
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

/** DET BY ID   **/
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})



module.exports = router