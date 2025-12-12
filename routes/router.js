const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 2025

const axios = require('axios')
router.use(express.static('public'))

/*** HOME PAGE => http://localhost:2025  ***/
router.get('/', (req, res)=> {
    res.render('pages/home', {
        title: 'christmas-app home',
        name:  "Tigi's Christmas App"
    })
})


/** ACTOR FORM  => http://localhost:/2025/actor-form  **/
router.get('/actor-form', (req, res)=> {
    res.render('pages/actor-form', {
        title: 'actor form',
        name: 'actor-form'
    })
})

/** DIRECTOR-FORM  => http://localhost:/api/2025/director-form  **/
router.get('/director-form', (req, res)=> {
    res.render('pages/director-form', {
        title: 'director form',
        name: 'director-form'
    })
})

/** PRODUCTION-FORM  => http://localhost:/2025/prodcution-form **/
router.get('/production-form', (req, res)=> {
    res.render('pages/production-form', {
        title: 'production form',
        name: 'production-form'
    })
})

/** PROGRAM-FORM =>  http://localhost:/2025/program-form  */
router.get('/program/create', (req, res) => {
    res.render('program/form', { program: {} })
})

/** STREAMING PLATFORM FORM  => http://localhost:/2025/streaming_platform-form **/
router.get('/streaming_platform-form', (req, res)=> {
    res.render('pages/streaming_platform-form', {
        title: 'streaming_platform form',
        name: 'streaming_platform-form',
        platform:{}
    })
})


/** API ROOT => http://localhost:2025/api **/
router.get('/api', (req, res)=> {
   // res.send('christmas api')
   res.json({
        'All Programs': `http://localhost:${PORT}/api/program`,
        'All Actors': `http://localhost:${PORT}/api/actor`,
        'All Directors': `http://localhost:${PORT}/api/director`,
        'All Productions': `http://localhost:${PORT}/api/production` ,
        'All Streaming platform': `http://localhost:${PORT}/api/streaming_platform`  
    })   
})

/** API ROUTES **/
router.use('/api/program', require('./api/programRoutes'))
router.use('/api/actor', require('./api/actorRoutes'))
router.use('/api/director', require('./api/directorRoutes'))
router.use('/api/production', require('./api/productionRoutes'))
router.use('/api/streaming_platform', require('./api/streaming_platformRoutes'))

/** PROGRAM => http://localhost:2025/program */
router.get('/program', (req, res)=>{
    const url = 'http:localhost:2025/api/program'
    axios.get(url).then(resp => {
        res.render('pages/program', {
            title: 'program',
            name: 'Christmas Program',
            endpoint: 'program',
            programs: resp.data

        })

    })
})

/** PROGRAM => http://localhost:2025/program */
router.get('/actor', (req, res)=>{
    const url = 'http:localhost:2025/api/actor'
    axios.get(url).then(resp => {
        res.render('pages/actor', {
            title: 'actor',
            name: 'Christmas Program Actor',
            endpoint: 'actor',
            actors: resp.data

        })

    })
})

/** PROGRAM => http://localhost:2025/program */
router.get('/director', (req, res)=>{
    const url = 'http:localhost:2025/api/director'
    axios.get(url).then(resp => {
        res.render('pages/director', {
            title: 'director',
            name: 'Christmas Program Director',
            endpoint: 'director',
            directors: resp.data

        })

    })
})

/** PROGRAM => http://localhost:2025/program */
router.get('/production', (req, res)=>{
    const url = 'http:localhost:2025/api/production'
    axios.get(url).then(resp => {
        res.render('pages/production', {
            title: 'production',
            name: 'Christmas Program Production',
            endpoint: 'production',
            productions: resp.data

        })

    })
})

/** PROGRAM => http://localhost:2025/program */
router.get('/streaming_platform', (req, res)=>{
    const url = 'http://localhost:2025/api/streaming_platform'
    axios.get(url).then(resp => {
        console.log(resp.data)
        res.render('pages/streaming_platform', {
            title: 'streaming_platform',
            name: 'Christmas Program streaming_platform',
            endpoint: 'streaming_platform',
            platforms: resp.data

        })

    })
})

/** ERROR HANDLING PAGE **/
router.use((req, res, next)=> {
    res.status(404)
    //.send('<h1>404 Error This page does not exist </h1>')
    .render('pages/error', {
        title: 'Error Page',
        name: 'Error'
    })
})

/** EXPORT ROUTER **/
module.exports = router