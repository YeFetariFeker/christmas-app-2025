const daoCommon = require('./common/daoCommon')

const programDao = {  /* Declares a new constant programDao which will be an obj  */
    ...daoCommon,   /* Using spread operator to copy all properties and metods from daoCommon obj into programDao */
    ...require('./api/programDao')  /* Require './api/programDao' and spreads all its exported properties into this obj*/
}

const actorDao = {
    ...daoCommon,
    ...require('./api/actorDao')
}

const directorDao = {
    ...daoCommon,
    ...require('./api/directorDao')
}

const productionDao = {
    ...daoCommon,
    ...require('./api/productionDao')
}

const streaming_platformDao = {
    ...daoCommon,
    ...require('./api/streaming_platformDao')
}

module.exports = {
    programDao,
    actorDao,
    directorDao,
    productionDao, 
   streaming_platformDao
}