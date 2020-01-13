const jwt = require('jsonwebtoken');

const AppError = require('../utilities/appError');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new AppError('Unauthorized access', 403);
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      throw new AppError('Invalid token', 403)
    }
    const decodedToken = await jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    const error = new AppError('Authentication failed', 403);
    next(error);
  }
};
