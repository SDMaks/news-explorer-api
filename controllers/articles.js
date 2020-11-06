const mongoose = require('mongoose');
const articleSchema = require('../models/article');

const InBaseNotFound = require('../errors/InBaseNotFound'); // 404
const BadRequest = require('../errors/badRequest'); // 400
const NoRightsError = require('../errors/noRightsError'); // 403

module.exports.getArticles = (req, res, next) => {
  articleSchema.find({ owner: req.user._id })
    .then((article) => {
      if (!article.length) {
        throw new InBaseNotFound('Нет статей в базе');
      }
      res.send({ data: article });
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  articleSchema.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  try {
    const { articleId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(articleId)) {
      throw new BadRequest('Не валидный запрос');
    }
    articleSchema.findById(articleId).select('+owner')
      .orFail(() => {
        throw new InBaseNotFound('Такой статьи в базе нет');
      })
      .then((article) => {
        if (req.user._id !== article.owner._id.toString()) {
          throw new NoRightsError('Нет прав...');
        }
        article.remove()
          .then(() => res.send({ article }));
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};
