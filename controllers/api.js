var URL = require(`${baseDir}/models/url`)
var cache = require(`${baseDir}/config/redis`).asyncRedis()

module.exports = {
  getURL: async function (shortUrl) {
    var isExist = await cache.exists(shortUrl)
    if (isExist) {
      var url = await cache.get(shortUrl)
      logger.info({
        label: 'hit',
        message: `Cache hit (${url})`
      })
      return url
    } else {
      var url = (await URL.findOne({
        shortUrl
      }).lean()).url
      if (!url) {
        logger.warn({
          label: 'not found',
          message: `URL not found`
        })
        return "Not exist"
      } else {
        logger.info({
          label: 'miss',
          message: `Cache missed (${url})`
        })
        await cache.set(shortUrl, url)
        return url
      }
    }
  },
  createURL: async function (url, shortUrl) {
    var isExist = await cache.exists(shortUrl)
    if (isExist) {
      logger.info({
        label: 'create',
        message: `The shorted URL already exists ${shortUrl}`
      })
    } else {
      await URL.create({
        url,
        shortUrl
      })
      cache.set(shortUrl, url)
      logger.info({
        label: 'create',
        message: `New shortened url created ${shortUrl}`
      })
    }
  }
}