const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.signInCelebrate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(/(([a-zA-Z])|(\d))+((([a-zA-Z]?)|(\d?))*)(([-](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*)*(([_](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*)*((([.](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*)|(([-](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*)|(([_](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*))*[@](((\w+\d*(([-]\w+\d*)|([-]\d+\w*)))|(\d+))|((\w+\d*[.]?\w+\d*)|(\w+\d*)))[.][a-z][a-z][a-z]?/),
    password: Joi.string().required().pattern(/^\S{8,}$/),
  }),
});

module.exports.signUpCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(/(([a-zA-Z])|(\d))+((([a-zA-Z]?)|(\d?))*)(([-](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*)*(([_](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*)*((([.](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*)|(([-](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*)|(([_](([a-zA-Z])|(\d)))?[a-zA-Z]*\d*))*[@](((\w+\d*(([-]\w+\d*)|([-]\d+\w*)))|(\d+))|((\w+\d*[.]?\w+\d*)|(\w+\d*)))[.][a-z][a-z][a-z]?/),
    password: Joi.string().required().pattern(/^\S{8,}$/),
  }),
});

module.exports.createArticleCelebrate = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(/http(s)?[:][/]{2}(www[.])?(((((\d*[a-z]+\d*((([-]\d*[a-z]+\d*))*)?((([-][a-z]*\d+[a-z]*))*)?)|([a-z]*\d+[a-z]*\d*))([-]\d+[a-z]*\d*)?([-][a-z]+\d*[a-z]*)?(([-]\d+[a-z]*\d*)*([-][a-z]+\d*[a-z]*)*)[.][a-z][a-z]([a-z])?((([:](([1-9])|([1-9][0-9])|([1-9][0-9][0-9])|([1-9][0-9][0-9][0-9])|(6553[0-5])|(655[0-3][0-5])|(655[0-2][0-9])|(65[0-5][0-3][0-5])|(65[0-4][0-9][0-9])|(6[0-5][0-5][0-3][0-5])|(6[0-4][0-9][0-9][0-9])|([1-6][0-5][0-5][0-3][0-5])|([1-5][0-9][0-9][0-9][0-9])))|((([/]((\d*(([a-z]+)|(\d+))\d*[a-z]*)|([a-z]*(([a-z]+)|(\d+))[a-z]*\d*))[/])*)))|((([/]\d*(([a-z]+)|(\d+))\d*[a-z]*([-]?\d*(([a-z]+)|(\d+))\d*[a-z]*)?([/]|[#]))|((([/]\d*(([a-z]+)|(\d+))\d*[a-z]*([-]?\d*(([a-z]+)|(\d+))\d*[a-z]*)?[/])((\d*(([a-z]+)|(\d+))\d*[a-z]*([-]?\d*(([a-z]+)|(\d+))\d*[a-z]*)?[/])*)*)(\d*(([a-z]+)|(\d+))\d*[a-z]*([-]?\d*(([a-z]+)|(\d+))\d*[a-z]*)?([/]|[#]))))))?)|(\d*(([a-z]+)|(\d+))(([.]?[a-z]+)?(([-]?[a-z]+\d*[a-z]*)*([-]\d+[a-z]*\d*)*)?\d*[a-z]*)?[.][a-z][a-z]([a-z])?)(([:](([1-9])|([1-9][0-9])|([1-9][0-9][0-9])|([1-9][0-9][0-9][0-9])|(6553[0-5])|(655[0-3][0-5])|(655[0-2][0-9])|(65[0-5][0-3][0-5])|(65[0-4][0-9][0-9])|(6[0-5][0-5][0-3][0-5])|(6[0-4][0-9][0-9][0-9])|([1-6][0-5][0-5][0-3][0-5])|([1-5][0-9][0-9][0-9][0-9]))[/]?)|((([/]((\d*[a-z]+\d*[a-z]*)|([a-z]*\d+[a-z]*\d*))[/])*))))|(\d{1,3}[.]\d{1,3}[.]\d{1,3}[.]\d{1,3}[:]((([1-9])|([1-9][0-9]))|([1-9][0-9][0-9])|([1-9][0-9][0-9][0-9])|(6553[0-5])|(655[0-3][0-5])|(655[0-2][0-9])|(65[0-5][0-3][0-5])|(65[0-4][0-9][0-9])|(6[0-5][0-5][0-3][0-5])|(6[0-4][0-9][0-9][0-9])|([1-6][0-5][0-5][0-3][0-5])|([1-5][0-9][0-9][0-9][0-9]))((([/]\d*[a-z]+\d*[a-z]*([-]?\d*[a-z]+\d*[a-z]*)?[#])|([/][a-z]*\d+[a-z]*([-][a-z]*\d+[a-z]*\d*)*[/]([a-z]*\d+([a-z]*\d*([-][a-z]*\d+[a-z]*\d*)+)?([/][a-z]*\d+[a-z]*\d*([-][a-z]*\d+[a-z]*\d*)*)*)?[#])|([a-z]*\d+[a-z]*\d*([-][a-z]*\d+[a-z]*\d*)*[#])|([/]((\d+)|([a-z]+))+([-][a-z]*(((\d+)|([a-z]+))[a-z]*\d*))*([/]((\d+)|([a-z]+))+([-][a-z]*(((\d+)|([a-z]+))[a-z]*\d*))*)*[#])|((([/]\d*[a-z]+\d*[a-z]*([-]?\d*[a-z]+\d*[a-z]*)?[/])((\d*[a-z]+\d*[a-z]*([-]?\d*[a-z]+\d*[a-z]*)?[/])*)*)(\d*[a-z]+\d*[a-z]*([-]?\d*[a-z]+\d*[a-z]*)?[#])))?)))/),
    image: Joi.string().required().pattern(/http(s)?[:][/]{2}(www[.])?(((((\d*[a-z]+\d*((([-]\d*[a-z]+\d*))*)?((([-][a-z]*\d+[a-z]*))*)?)|([a-z]*\d+[a-z]*\d*))([-]\d+[a-z]*\d*)?([-][a-z]+\d*[a-z]*)?(([-]\d+[a-z]*\d*)*([-][a-z]+\d*[a-z]*)*)[.][a-z][a-z]([a-z])?((([:](([1-9])|([1-9][0-9])|([1-9][0-9][0-9])|([1-9][0-9][0-9][0-9])|(6553[0-5])|(655[0-3][0-5])|(655[0-2][0-9])|(65[0-5][0-3][0-5])|(65[0-4][0-9][0-9])|(6[0-5][0-5][0-3][0-5])|(6[0-4][0-9][0-9][0-9])|([1-6][0-5][0-5][0-3][0-5])|([1-5][0-9][0-9][0-9][0-9])))|((([/]((\d*(([a-z]+)|(\d+))\d*[a-z]*)|([a-z]*(([a-z]+)|(\d+))[a-z]*\d*))[/])*)))|((([/]\d*(([a-z]+)|(\d+))\d*[a-z]*([-]?\d*(([a-z]+)|(\d+))\d*[a-z]*)?([/]|[#]))|((([/]\d*(([a-z]+)|(\d+))\d*[a-z]*([-]?\d*(([a-z]+)|(\d+))\d*[a-z]*)?[/])((\d*(([a-z]+)|(\d+))\d*[a-z]*([-]?\d*(([a-z]+)|(\d+))\d*[a-z]*)?[/])*)*)(\d*(([a-z]+)|(\d+))\d*[a-z]*([-]?\d*(([a-z]+)|(\d+))\d*[a-z]*)?([/]|[#]))))))?)|(\d*(([a-z]+)|(\d+))(([.]?[a-z]+)?(([-]?[a-z]+\d*[a-z]*)*([-]\d+[a-z]*\d*)*)?\d*[a-z]*)?[.][a-z][a-z]([a-z])?)(([:](([1-9])|([1-9][0-9])|([1-9][0-9][0-9])|([1-9][0-9][0-9][0-9])|(6553[0-5])|(655[0-3][0-5])|(655[0-2][0-9])|(65[0-5][0-3][0-5])|(65[0-4][0-9][0-9])|(6[0-5][0-5][0-3][0-5])|(6[0-4][0-9][0-9][0-9])|([1-6][0-5][0-5][0-3][0-5])|([1-5][0-9][0-9][0-9][0-9]))[/]?)|((([/]((\d*[a-z]+\d*[a-z]*)|([a-z]*\d+[a-z]*\d*))[/])*))))|(\d{1,3}[.]\d{1,3}[.]\d{1,3}[.]\d{1,3}[:]((([1-9])|([1-9][0-9]))|([1-9][0-9][0-9])|([1-9][0-9][0-9][0-9])|(6553[0-5])|(655[0-3][0-5])|(655[0-2][0-9])|(65[0-5][0-3][0-5])|(65[0-4][0-9][0-9])|(6[0-5][0-5][0-3][0-5])|(6[0-4][0-9][0-9][0-9])|([1-6][0-5][0-5][0-3][0-5])|([1-5][0-9][0-9][0-9][0-9]))((([/]\d*[a-z]+\d*[a-z]*([-]?\d*[a-z]+\d*[a-z]*)?[#])|([/][a-z]*\d+[a-z]*([-][a-z]*\d+[a-z]*\d*)*[/]([a-z]*\d+([a-z]*\d*([-][a-z]*\d+[a-z]*\d*)+)?([/][a-z]*\d+[a-z]*\d*([-][a-z]*\d+[a-z]*\d*)*)*)?[#])|([a-z]*\d+[a-z]*\d*([-][a-z]*\d+[a-z]*\d*)*[#])|([/]((\d+)|([a-z]+))+([-][a-z]*(((\d+)|([a-z]+))[a-z]*\d*))*([/]((\d+)|([a-z]+))+([-][a-z]*(((\d+)|([a-z]+))[a-z]*\d*))*)*[#])|((([/]\d*[a-z]+\d*[a-z]*([-]?\d*[a-z]+\d*[a-z]*)?[/])((\d*[a-z]+\d*[a-z]*([-]?\d*[a-z]+\d*[a-z]*)?[/])*)*)(\d*[a-z]+\d*[a-z]*([-]?\d*[a-z]+\d*[a-z]*)?[#])))?)))/),
  }),
});

module.exports.deleteArticleCelebrate = celebrate({
  params: Joi.object().keys({
    articleId: Joi.objectId().length(24).hex(),
  }),
});
