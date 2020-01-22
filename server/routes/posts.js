const { Router } = require('express');

const protect = require('../middlewares/protect');
const { posts } = require('../controllers');

const router = Router();

router
  .route('/')
  .get(posts.getAll)
  .post(protect, posts.create);
router.post('/upvote', protect, posts.upvote);
router.post('/downvote', protect, posts.downvote);
router.get('/community/:communityName', posts.getByCommunity);

module.exports = router;
