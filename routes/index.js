const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const users = require('./routUser');
const articles = require('./routArticles');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users.js');
// const { createUserValid, loginValid } = require('../middlewares/validation');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(/(([a-zA-Z])|(\d))+((([a-zA-Z]?)|(\d?))*)(([-](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*)*(([_](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*)*((([.](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*)|(([-](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*)|(([_](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*))*[@](((\w+\d*(([-]\w+\d*)|([-]\d+\w*)))|(\d+))|((\w+\d*[.]?\w+\d*)|(\w+\d*)))[.][a-z][a-z][a-z]?/),
    password: Joi.string().required().pattern(/^\S{8,}$/),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(/(([a-zA-Z])|(\d))+((([a-zA-Z]?)|(\d?))*)(([-](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*)*(([_](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*)*((([.](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*)|(([-](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*)|(([_](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*))*[@](((\w+\d*(([-]\w+\d*)|([-]\d+\w*)))|(\d+))|((\w+\d*[.]?\w+\d*)|(\w+\d*)))[.][a-z][a-z][a-z]?/),
    password: Joi.string().required().pattern(/^\S{8,}$/),
  }),
}), createUser);

router.use(auth);

router.use('/users', users);
router.use('/articles', articles);

module.exports = router;
