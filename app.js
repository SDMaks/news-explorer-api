require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorMiddleware = require('./middlewares/errorMiddleware');
const nonExistedUrl = require('./middlewares/nonExistedUrl');
const limiter = require('./middlewares/rateLimit');

const app = express();

const { PORT = 3200, NEWS_BASE = 'mongodb://localhost:27017/newsdb' } = process.env;

mongoose.connect(NEWS_BASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger); // подключаем логгер запросов

app.use(router);
app.use('*', nonExistedUrl); // обработка несуществующего url

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(errorMiddleware);
app.listen(PORT);
