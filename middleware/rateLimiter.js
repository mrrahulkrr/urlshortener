const rateLimit = require('express-rate-limit');

const urlRateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS),  // 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS),    // limiting each IP to 100 requests per windowMs
  message: 'Too many URL shortening requests, please try again later.',
  standardHeaders: true,  // Returning rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,   // Disabling the `X-RateLimit-*` headers
});

module.exports = urlRateLimiter;