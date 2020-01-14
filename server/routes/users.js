const cookieParser = require('cookie-parser');
const { Router } = require('express');

const protect = require('../middlewares/protect');
const { users } = require('../controllers');
const { schemas, validate } = require('../middlewares/validation');

const router = Router();

router.get('/', protect, users.getSession);
router.post('/register', validate(schemas.register, 'body'), users.register);
router.post('/login', validate(schemas.login, 'body'), users.login);
router.get('/logout', users.logout);
router.get('/refresh_token', cookieParser(), users.refreshToken);

module.exports = router;
