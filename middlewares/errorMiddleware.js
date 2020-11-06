const errorMiddleware = (err, req, res) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Невалидный запрос' });
  }
  return res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
};

module.exports = errorMiddleware;
