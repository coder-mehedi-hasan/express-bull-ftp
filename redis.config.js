const redisConfig = {
    redis: {
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
    },
};

module.exports = { redisConfig }