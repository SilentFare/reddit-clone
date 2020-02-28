const { Router } = require('express');

const protect = require('../middlewares/protect');
const session = require('../middlewares/session');
const { posts } = require('../controllers');

const router = Router();

router
  .route('/')
  .get(session, posts.getAll)
  .post(protect, posts.create);
router.post('/upvote', protect, posts.upvote);
router.post('/downvote', protect, posts.downvote);
router.get('/community/:communityName', session, posts.getByCommunity);
router.get('/user/:userName', session, posts.getByUser);
router.route('/:post_id').get(session, posts.getOne);

module.exports = router;
