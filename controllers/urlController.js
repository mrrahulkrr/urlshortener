const Url = require('../models/Url');
const generateShortId = require('../utils/generateShortId');

exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    // Checking if URL already exists
    let existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      return res.status(200).json({
        shortUrl: `${req.protocol}://${req.get('host')}/${existingUrl.shortId}`,
        shortId: existingUrl.shortId
      });
    }

    // Generating unique shortId
    const shortId = generateShortId();


    const newUrl = new Url({
      originalUrl,
      shortId
    });

    await newUrl.save();

    res.status(201).json({
      shortUrl: `${req.protocol}://${req.get('host')}/${shortId}`,
      shortId
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error while shortening URL' });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await Url.findOne({ shortId });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Updating click count and last accessed time
    url.clicks += 1;
    url.lastAccessed = new Date();
    await url.save();

    // Redirecting to original URL
    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: 'Server error while redirecting' });
  }
};

exports.getUrlStats = async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await Url.findOne({ shortId });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.status(200).json({
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      lastAccessed: url.lastAccessed,
      createdAt: url.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching stats' });
  }
};