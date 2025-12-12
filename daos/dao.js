const daoCommon = require('./common/daoCommon')

const programDao = {
    ...daoCommon,
    ...require('./api/programDao')
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