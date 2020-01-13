const jwt = require('jsonwebtoken');

module.exports = async (payload, secret, expiration) => {
  const token = await jwt.sign(payload, secret, {
    expiresIn: expiration
  });
  return token;
};
