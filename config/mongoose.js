const host = process.env.MONGO_HOST

module.exports = async (mongoose) => {
    try {
        await mongoose
            .connect(`mongodb://${host}/surl`, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false
            })
        logger.info({
            label: 'Mongo',
            message: `Successfully connected to ${host}`
        })
    } catch (err) {
        logger.error({
            label: 'Mongo',
            message: `Failed to connect ${host}`
        })
    }
}