var URL = require(`${baseDir}/models/url`)
var cache = require(`${baseDir}/config/redis`).asyncRedis()

module.exports = {
  // Get original URL with shortUrl
  getURL: async function (shortUrl) {
    var isExist = await cache.exists(shortUrl)
    if (isExist) {
      // If the shortUrl cached in Redis then using it
      var url = await cache.get(shortUrl)
      logger.info({
        label: 'hit',
        message: `Cache hit (${url})`
      })
      return url
    } else {
      // If not cached, it will get the data from MongoDB and also store it to Redis
      var data = (await URL.findOne({
        shortUrl
      }).lean())
      if (!data) {
        logger.warn({
          label: 'not found',
          message: `URL not found`
        })
        return "Not exist"
      } else {
        var url = data.url
        logger.info({
          label: 'miss',
          message: `Cache missed (${url})`
        })
        cache.set(shortUrl, url)
        return url
      }
    }
  },
  createURL: async function (url, shortUrl) {
    // If requested with Original URL to get shortUrl,
    // store it in the MongoDB and then also store it into Redis
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