const router = require('express').Router();
const users = require('./routUser');
const articles = require('./routArticles');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users.js');
const { signInCelebrate, signUpCelebrate } = require('../errors/celebrateError');

router.post('/signin', signInCelebrate, login);
router.post('/signup', signUpCelebrate, createUser);

router.use(auth);

router.use('/users', users);
router.use('/articles', articles);

module.exports = router;
