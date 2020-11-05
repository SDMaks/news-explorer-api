/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
const userSchema = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const InBaseNotFound = require('../errors/InBaseNotFound'); // 404
// const BadRequest = require('../errors/badRequest');
const ErrorUniqueUser = require('../errors/errorUniqueUser'); // 409

module.exports.findUserId = (req, res, next) => {
  try {
    const owner = req.user._id;
    userSchema.findById(owner)
      .orFail(() => {
        throw new InBaseNotFound('Нет пользователя в базе');
      })
      .then((user) => res.send({
        name: user.name,
        email: user.email,
      }))
      .catch(next);
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  // console.log(req.body);
  bcrypt.hash(password, 10)
    .then((hash) => userSchema.create({
      name,
      email,
      password: hash,

    }))
    .then((user) => res.status(201).send({ _id: user._id, email: user.email }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ErrorUniqueUser('Пользователь с таким Email уже зарегестрирован!'));
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return userSchema.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
