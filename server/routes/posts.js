const { Router } = require('express');

const protect = require('../middlewares/protect');
const { posts } = require('../controllers');

const router = Router();

router
  .route('/')
  .get(posts.getAll)
  .post(protect, posts.create);

router.get('/:community', posts.getByCommunity);

module.exports = router;
