const pg = require('pg');
// Cast aggregated string numbers to integers
pg.types.setTypeParser(20, 'text', parseInt);
// Set the environment the application runs in
const environment = process.env.NODE_ENV || 'development';
// Load the database configuration
const config = require('../knexfile.js')[environment];

module.exports = require('knex')(config);
