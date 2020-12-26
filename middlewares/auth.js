const jwt = require('jsonwebtoken');

const AuthorizedError = require('../errors/authorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  if (req.headers.cookie === undefined) {
    return next(new AuthorizedError('Необходима авторизация'));
  }
  const token = req.headers.cookie.replace('jwt=', '');
  if (!token) {
    return next(new AuthorizedError('Необходима авторизация'));
  }

  // const token = authorization.replace('Bearer ', '');
  // console.log(token)
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw next(new AuthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
