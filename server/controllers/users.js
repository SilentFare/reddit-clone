const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../database');
const createToken = require('../utilities/createToken');
const AppError = require('../utilities/appError');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const existingUserName = await database
      .table('users')
      .select()
      .where({ name });
    const existingUserEmail = await database
      .table('users')
      .select()
      .where({ email });
    const errors = {};
    if (existingUserName.length > 0) {
      errors.name = 'Name is already taken';
    }
    if (existingUserEmail.length > 0) {
      errors.email = 'Email address is already taken';
    }
    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ errors });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await database
      .table('users')
      .insert({ name, email, password: hashedPassword }, '*');
    const accessToken = await createToken(
      { userId: newUser[0].id },
      process.env.ACCESS_SECRET,
      process.env.ACCESS_EXPIRATION
    );
    const refreshToken = await createToken(
      { userId: newUser[0].id },
      process.env.REFRESH_SECRET,
      process.env.REFRESH_EXPIRATION
    );
    res.cookie('token', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(process.env.REFRESH_EXPIRATION))
    });
    const { password: omit, ...userWithoutPassword } = newUser[0];
    res.status(201).json({
      token: accessToken,
      user: userWithoutPassword
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const existingUser = await database
      .table('users')
      .select()
      .where({ name });
    if (existingUser.length === 0) {
      throw new AppError('Invalid credentials', 403);
    }
    const user = existingUser[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AppError('Invalid credentials', 403);
    }
    const accessToken = await createToken(
      { userId: user.id },
      process.env.ACCESS_SECRET,
      process.env.ACCESS_EXPIRATION
    );
    const refreshToken = await createToken(
      { userId: user.id },
      process.env.REFRESH_SECRET,
      process.env.REFRESH_EXPIRATION
    );
    res.cookie('token', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(process.env.REFRESH_EXPIRATION))
    });
    const { password: omit, ...userWithoutPassword } = user;
    res.status(200).json({
      token: accessToken,
      user: userWithoutPassword
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Logged Out'
  });
};

const refreshToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new AppError('Refresh token is required', 499);
    }
    const decodedToken = await jwt.verify(token, process.env.REFRESH_SECRET);
    const user = await database
      .table('users')
      .select()
      .where({ id: decodedToken.userId });
    if (user.length === 0) {
      throw new AppError('Invalid refresh token', 401);
    }
    const accessToken = await createToken(
      { userId: user[0].id },
      process.env.ACCESS_SECRET,
      process.env.ACCESS_EXPIRATION
    );
    res.status(200).json({
      token: accessToken
    });
  } catch (error) {
    next(error);
  }
};

const getSession = async (req, res, next) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  getSession
};
