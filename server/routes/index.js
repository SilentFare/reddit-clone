const { Router } = require('express');

const users = require('./users');
const communities = require('./communities');
const posts = require('./posts');

const router = Router();

router.use('/users', users);
router.use('/communities', communities);
router.use('/posts', posts);

module.exports = router;
