const InBaseNotFound = require('../errors/InBaseNotFound'); // 404

module.exports = (req, res, next) => {
  next(new InBaseNotFound('Введен несуществующий url'));
};
