const { Router } = require('express');

const protect = require('../middlewares/protect');
const session = require('../middlewares/session');
const { comments } = require('../controllers');

const router = Router();

router.route('/').post(protect, comments.create);
router.get('/post/:post_id', session, comments.getByPost);
router.get('/user/:userName', session, comments.getByUser);
router.post('/upvote', protect, comments.upvote);
router.post('/downvote', protect, comments.downvote);

module.exports = router;
