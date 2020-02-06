const jwt = require('jsonwebtoken');

const AppError = require('../utilities/appError');
const database = require('../database');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return next();
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      next();
    }
    const decodedToken = await jwt.verify(token, process.env.ACCESS_SECRET);
    const user = await database
      .table('users')
      .select()
      .where({ id: decodedToken.userId });
    const { password, ...userWithoutPassword } = user[0];
    req.user = userWithoutPassword;
    next();
  } catch (err) {
    next();
  }
};
