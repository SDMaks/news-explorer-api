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

// ----------------------------------------

/* module.exports.findCard = (req, res, next) => {
  cardSchema.find({})
    .then((card) => {
      if (!card.length) {
        throw new InBaseNotFound('Нет карточек в базе');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  cardSchema.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  try {
    const { cardId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      throw new BadRequest('Не валидный запрос');
    }
    cardSchema.findById(cardId)
      .orFail(() => {
        throw new InBaseNotFound('Такой карточки в базе нет');
      })
      .then((card) => {
        if (req.user._id !== card.owner._id.toString()) {
          throw new NoRightsError('Нет прав...');
        }
        card.remove()
          .then(() => res.send({ message: 'Карточка удалена' }));
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};

module.exports.likeCard = (req, res, next) => {
  try {
    const { cardId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      throw new BadRequest('Не валидный запрос');
    }
    cardSchema.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
      .orFail(() => {
        throw new InBaseNotFound('Такой карточки в базе нет');
      })
      .then((card) => res.status(200).send({ data: card }))
      .catch(next);
  } catch (err) {
    next(err);
  }
};

module.exports.dislikeCard = (req, res, next) => {
  try {
    const { cardId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      throw new BadRequest('Не валидный запрос');
    }
    cardSchema.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
      .orFail(() => {
        throw new InBaseNotFound('Такой карточки в базе нет');
      })
      .then((card) => res.status(200).send({ data: card }))
      .catch(next);
  } catch (err) {
    next(err);
  }
}; */
