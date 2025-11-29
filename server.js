/* BUILD SERVER */
const express = require('express')
const server = express()
const router = require('./routes/router')
const PORT = process.env.PORT || 2025

/* HANDLE SECURITY .. IMPORTING HELMET AND CORS*/
const helmet = require('helmet')
const cors = require('cors')

/* ADDS THE LYER FOR SECURITY FOR IMGS AND STATICS */
//server.use(helmet()) 
/* CONFIGURING HELMET */
server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    directives: {
        "img-src": ["'self'", "https: data"],
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"]  
    }
}))

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true}))

/* LOCALHOST: 2025 */
server.use('/', router)



/* BUILD A SERVER THAT CONNECTS TO GIT BASH SERVER */
server.listen(PORT, ()=> console.log('Merry Christmas Everyone Dec 2025!!!🎄🎅🎁❄️'))