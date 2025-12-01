const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 2025

/* CREATE ROOT ROUTE FOR API => http://localhost:2025/api */
router.get('/api', (req, res)=> {
    //res.send('christmas api')
    res.json({
        'All Actors': `http://localhost:${PORT}/api/actor`
    })

})

router.use('/api/actor', require('./api/actorRoutes'))

/* BUILD ERROR PAGE THAT HANDLE ERRORS*/
router.use((req, res, next)=> {
    res.status(404)
    .send('<h1>404 Error This page does not exist </h1>')

})


module.exports = router