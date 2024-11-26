const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const validateUrl = require('../middleware/validateUrl');
const rateLimiter = require('../middleware/rateLimiter');


router.post('/shorten',
  rateLimiter,
  validateUrl,
  urlController.shortenUrl
);

// Redirecting Short URL Route
router.get('/:shortId', urlController.redirectUrl);

// URL Stats Route
router.get('/stats/:shortId', urlController.getUrlStats);

module.exports = router;