const mongoose = require('mongoose');

const validator = require('validator');

const bcrypt = require('bcryptjs');

const AuthorizedError = require('../errors/authorizedError'); // 401

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Почта введена неправильно',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

});

userSchema.statics.findUserByCredentials = function findByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) { return Promise.reject(new AuthorizedError('Неправильные почта или пароль')); }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);