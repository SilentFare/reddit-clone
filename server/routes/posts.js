const { Router } = require('express');

const { posts } = require('../controllers');

const router = Router();

router.route('/').post(posts.create);

module.exports = router;
