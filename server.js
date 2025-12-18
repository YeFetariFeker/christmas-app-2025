/* BUILD SERVER */
const express = require('express') /* Import express  */
const server = express() /* Express application (server) used to config middleware, routes, & start listening for req */
const router = require('./routes/router') /* Import routes */
const PORT = process.env.PORT || 2025 /* sets port number */

/* HANDLE SECURITY .. IMPORTING HELMET AND CORS*/
const helmet = require('helmet') /* a package for adding security on header */
const cors = require('cors') /* a package restr */

/* ADDS THE LYER FOR SECURITY FOR IMGS AND STATICS */
//server.use(helmet()) 
/* CONFIGURING HELMET */
server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    directives: {
        "img-src": ["'self'", "https: data"], /* images load from server  */
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"]   /* load from server or CDN(cdn.jsdeliver.net) */
    }
}))

server.use(cors()) 
server.use(express.json()) 
server.use(express.urlencoded({ extended: true}))

/*** SETTING EJS AS MY VIEW ENGINE TO RENDER HTML PAGES  ***/
server.set('view engine', 'ejs')

/* LOCALHOST: 2025 */
server.use('/', router)



/* BUILD A SERVER THAT CONNECTS TO GIT BASH SERVER */
server.listen(PORT, ()=> console.log('Merry Christmas Everyone Dec 2025!!!🎄🎅🎁❄️'))