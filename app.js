require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
// const routCard = require('./routes/routCard.js');
const router = require('./routes/index.js');
// const routUser = require('./routes/routUser.js');
// const { createUser, login } = require('./controllers/users.js');

// const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorMiddleware = require('./middlewares/errorMiddleware');
const nonExistedUrl = require('./middlewares/nonExistedUrl');

const app = express();

const { PORT = 3200, NEWS_BASE = 'mongodb://localhost:27017/newsdb' } = process.env;

mongoose.connect(NEWS_BASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 мин
  max: 100, // ограничение кс каждого IP до 100 запросов
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
