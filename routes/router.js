const express = require('express')  /*Import express */
const router = express.Router()   /* Creates a new express routes */
const PORT = process.env.PORT || 2025  /* Sets the port number */

const axios = require('axios')  /* Imports Axios for making HTTP request to APIs feach calls */
router.use(express.static('public'))  /* Serves static files (CSS, images, JS) from the public */

/******* HOME PAGE ******/
router.get('/', (req, res)=> {  /* Defines a GET route for the root URL(/) */
    res.render('pages/home', {  /* Renders the home view templete */
        title: 'christmas-app home',
        name:  "Tigi's Christmas App"
    })
})

/******* ACTOR FORM *******/
router.get('/actor-form', (req, res)=> { /* Get route for the actor page */
    res.render('pages/actor-form', {   /* Renders the actor form template */
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


/** API ROOT ROUTE=> http://localhost:2025/api **/
router.get('/api', (req, res)=> {  /* GET route for the API root */
   // res.send('christmas api')
   res.json({ /* Sends a JSON response listing available API endpoints */
         /* Dyanmically builds endpoint URLs using the port number */
        'All Programs': `http://localhost:${PORT}/api/program`,
        'All Actors': `http://localhost:${PORT}/api/actor`,
        'All Directors': `http://localhost:${PORT}/api/director`,
        'All Productions': `http://localhost:${PORT}/api/production` ,
        'All Streaming platform': `http://localhost:${PORT}/api/streaming_platform`  
    })   
})

/********** API ROUTES **********/
/* Connectes API URLs to their routes and allow browser to talk to db */
router.use('/api/program', require('./api/programRoutes'))
router.use('/api/actor', require('./api/actorRoutes'))
router.use('/api/director', require('./api/directorRoutes'))
router.use('/api/production', require('./api/productionRoutes'))
router.use('/api/streaming_platform', require('./api/streaming_platformRoutes'))

/** PROGRAM LIST PAGE => http://localhost:2025/program */
router.get('/program', (req, res)=>{  /* GET routes for viewing programs */
    const url = 'http://localhost:2025/api/program'
    axios.get(url).then(resp => { /* Fetches program data from the API */
        res.render('pages/program', {  /* Renders the program page with API data */
            title: 'program',
            name: 'Christmas Program',
            endpoint: 'program',
            programs: resp.data   /* Passes program data to the templete */
        })
    })
})

/** ACTOR LIST PAGE => http://localhost:2025/actor */
router.get('/actor', (req, res)=>{
    const url = 'http://localhost:2025/api/actor'
    axios.get(url).then(resp => {
        res.render('pages/actor', {
            title: 'actor',
            name: 'Christmas Program Actor',
            endpoint: 'actor',
            actors: resp.data
        })
    })
})

/** DIRECTOR LIST PAGE => http://localhost:2025/director */
router.get('/director', (req, res)=>{      /* GET route for director list page  */
    const url = 'http:localhost:2025/api/director'
    axios.get(url).then(resp => {
        res.render('pages/director', {
            title: 'director',
            name: 'Christmas Program Director',
            endpoint: 'director',
            directors: resp.data  /* Passes director data to the view */
        })
    })
})

/** PRODUCTION LIST PAGE => http://localhost:2025/production */
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

/** STREAMING PLATFORM LIST PAGE => http://localhost:2025/streaming_platform */
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

/** ERROR HANDLING(404) PAGE **/
router.use((req, res, next)=> {  /* Catch-all middleware for unmatche routes */
    res.status(404)
    //.send('<h1>404 Error This page does not exist </h1>')
    .render('pages/error', {  /* Renders the error page */
        title: 'Error Page',
        name: 'Error'
    })
})

/** EXPORT ROUTER **/
module.exports = router