const shortid = require('shortid');

const generateShortId = () => {
  shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');
  return shortid.generate();
};

module.exports = generateShortId;