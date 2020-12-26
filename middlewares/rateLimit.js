const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 мин
  max: 1000, // ограничение кс каждого IP до 100 запросов
});

module.exports = limiter;
