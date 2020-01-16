const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const routes = require('./routes');
const AppError = require('./utilities/appError');

const app = express();

// Initialize all middlewares
// Enable all CORS requests
app.use(cors());
// Set HTTP headers
app.use(helmet());
// Parse requests with JSON payloads and create body object on the request object
app.use(express.json());
// Parse requests with urlencoded payloads and create body object on the request object
app.use(express.urlencoded({ extended: true }));
// Compress response bodies
app.use(compression());
// HTTP logger only in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Limit requests from same IP (100 in 1 hour)
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// REST API routes
app.use('/api', routes);
// Global error handler
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.statusCode || 500);
  res.json({
    message: error.message || 'An unknown error occurred'
  });
});
// Handle all not defined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
