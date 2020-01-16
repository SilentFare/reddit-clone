const jwt = require('jsonwebtoken');

const AppError = require('../utilities/appError');
const database = require('../database');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(req.headers);
    if (!authorization) {
      throw new AppError('Unauthorized access', 403);
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      throw new AppError('Invalid token', 403);
    }
    console.log(authorization, token);
    const decodedToken = await jwt.verify(token, process.env.ACCESS_SECRET);
    console.log(decodedToken);
    const user = await database
      .table('users')
      .select()
      .where({ id: decodedToken.userId });
    const { password, ...userWithoutPassword } = user[0];
    req.user = userWithoutPassword;
    next();
  } catch (err) {
    const error = new AppError('Authentication failed', 403);
    next(err);
  }
};
