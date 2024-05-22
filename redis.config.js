const redisConfig = {
    redis: {
        port: Number(process.env.REDIS_PORT ?? 6379),
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
    },
};

module.exports = { redisConfig }