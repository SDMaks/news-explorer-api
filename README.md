
# **Диплом бэкенд**

Финальный проект Яндекс.Практикум. Размещение на виртуальном сервере.

## **Основной функционал проекта**

Обработка запросов на локальном сервере:


В Проекте реализован функционал создания пользователя и его авторизация. Авторизация происходит при всех запросах за исключением самой авторизации и создания пользователя.

В проекте также реализован функционал безопасности вэб-приложения. Например, ключ предварительно был зашифрован и хранится в переменной окружения в файле **.env** .
Ключ сгенерирован посредством:

``` 
require('crypto').randomBytes(32).toString('hex'))
```

Токен сгенерирован с помощью jwt и передаётся пользователю в виде куки. В проекте используются заголовки безопасности — для этого есть модуль **Helmet**.

В проекте реализован функционал по валидации входящих данных с помощью библиотек **Joy** и **Celebrate**.

Для сбора запросов к серверу и ошибок используется технология **Wiston**.

## **Используемые технологии**

+ Node.js;
+ Express;
+ Eslint;
+ Nodemon;
+ Mongodb;
+ Mongoose;
+ Nodemon;
+ Helmet;
+ Bcryptjs;
+ Jsonwebtoken;
+ express-rate-limit;
+ Validator;
+ Celebrate;
+ Joy;
+ Winston

## **Актуальная версия проекта**

***v.0.0.4***

## **Как запустить проект**
1. _Локально_:
Необходимо скачать проект, установить необходимые компоненты командой **npm install**. Отправка запросов можно осуществлять через Postman.  Также потребуется установка Compass. Чтобы запустить проект нужно ввести комманды в терминале **npm run start** или **npm run dev**. Запустить базу данных командой **mongod**. Затем через **Postman** делать соответствующие запросы по адресу  **http://localhost:3220/...** .

2. _Через публичные адреса_:
Через Postman делать запросы по адресам:


## **Публичный IP адрес сервера**
http://130.193.57.160/
