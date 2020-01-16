const { Router } = require('express');

const users = require('./users');
const communities = require('./communities');

const router = Router();

router.use('/users', users);
router.use('/communities', communities);

module.exports = router;
