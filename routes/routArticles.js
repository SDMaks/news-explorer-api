const routArticle = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
// Joi.objectId = require('joi-objectid')(Joi);
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { createArticleCelebrate, deleteArticleCelebrate } = require('../errors/celebrateError');

routArticle.get('/', getArticles);
routArticle.post('/', createArticleCelebrate, createArticle);
routArticle.delete('/:articleId', deleteArticleCelebrate, deleteArticle);
// ---------------------------------

module.exports = routArticle;
