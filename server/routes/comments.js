const { Router } = require('express');

const protect = require('../middlewares/protect');
const { comments } = require('../controllers');

const router = Router();

router.get('/post/:post_id', comments.getByPost);

module.exports = router;
