const host = process.env.REDIS_HOST
const port = process.env.REDIS_PORT

module.exports = {
  asyncRedis: function () {
    try {
      const asyncRedis = require("async-redis")
      const client = asyncRedis.createClient(port, host)
      client.select(1)
      logger.info({
        label: 'Redis',
        message: `Successfully connected to ${host}`
      })
      return client
    } catch (e) {
      logger.error({
        label: 'Redis',
        message: `Failed to connect ${host}`
      })
    }
  },
}