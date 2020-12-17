var URL = require(`${baseDir}/models/url`)
var cache = require(`${baseDir}/config/redis`).asyncRedis()

module.exports = {
  getURL: async function (shortUrl) {
    var url = await cache.get(shortUrl)
    if (!url) {
      url = await URL.findOne({
        shortUrl
      }).lean()
      logger.info({
        label: 'miss',
        message: `Cache missed (${shortUrl})`
      })
      await cache.set(shortUrl, url)
    } else {
      logger.info({
        label: 'hit',
        message: `Cache hit (${shortUrl})`
      })
    }
    return {
      url
    }
  },
  createURL: async function (url, shortUrl) {
    var url = await this.getURL(shortUrl)
    if (url) {
      logger.error({
        label: 'create',
        message: `Duplicated request occurs in ${shortUrl}`
      })
      return false
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
      return true
    }
  },
}