const routUser = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
// Joi.objectId = require('joi-objectid')(Joi);
const { findUserId } = require('../controllers/users');

routUser.get('/me', findUserId);
/* routUser.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId().length(24).hex(),
  }),
}), findUserId); */

module.exports = routUser;
