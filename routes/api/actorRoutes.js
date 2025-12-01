const express = require('express')
const router = express.Router()

const { actorDao: dao} = require('../../daos/dao')

/* HTTP://LOCALHOST:2025/API/ACTOR */
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table)

})

/* HTTP://LOCALHOST:2025/API/SORTER */
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

/* HTTP://LOCALHOST:2025/API/:ID*/
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})



module.exports = router