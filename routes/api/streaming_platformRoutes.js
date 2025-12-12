const express = require('express')
const router = express.Router()

const { streaming_platformDao: dao} = require('../../daos/dao') /*imports dao */

/** GET ALL =>  HTTP://LOCALHOST:2025/API/STREAMING_PLATFORM **/
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table)

})

/** GET STREAMING PLATFORM BY NAME  **/
router.get('/by_name/:name', (req, res) => {
    dao.findByName(req, res); // pass req and res to the dao
});

/**FIND PROGRAM BY STREAMING PLATFORM **/
router.get('/get_program/:id', (req, res)=> {
    dao.findProgramByStreaming_platform(res, dao.table, req.params.id)
})

/** Find streaming platforms by program rating */
router.get('/by_rating/:rating', (req, res) => {
    const rating = req.params.rating;  // Get the rating from the URL parameter
    dao.findByProgramRating(req, res, dao.table, rating);  // Call the DAO method with rating
});

/** SEARCH STREAMING_PLATFORM BY NAME  **/
router.get('/search/:column/:value', (req, res)=> {
    const { column, value} = req.params
    dao.search(res, dao.table, column, value) /* CALLS THE SEARCH METHOD IN DAO */
})

/** SORT  **/
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

/** DET BY ID   **/
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})



module.exports = router