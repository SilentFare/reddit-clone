const { Router } = require('express');

const users = require('./users');
const communities = require('./communities');
const posts = require('./posts');
const comments = require('./comments');

const router = Router();

router.use('/users', users);
router.use('/communities', communities);
router.use('/posts', posts);
router.use('/comments', comments);

module.exports = router;
