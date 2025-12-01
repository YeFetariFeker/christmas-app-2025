const daoCommon = require('./common/daoCommon')

const actorDao = {
    ...daoCommon,
    ...require('./api/actorDao')
}

module.exports = {
    actorDao
}