const { Router } = require('express');

const protect = require('../middlewares/protect');
const { comments } = require('../controllers');

const router = Router();

router.route('/').post(protect, comments.create);
router.get('/post/:post_id', comments.getByPost);
router.post('/upvote', comments.upvote);
router.post('/downvote', comments.downvote);

module.exports = router;
