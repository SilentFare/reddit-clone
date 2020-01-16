const { Router } = require('express');

const protect = require('../middlewares/protect');
const { communities } = require('../controllers');

const router = Router();

router
  .route('/')
  .get(communities.getAll)
  .post(protect, communities.create);

module.exports = router;
