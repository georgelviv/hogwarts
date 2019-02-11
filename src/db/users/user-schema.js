const Joi = require('joi');

const userSchema = {
  name: Joi.string().min(3).required(),
  gender: Joi.any().valid('male', 'female').required(),
  age: Joi.number().integer().min(0).max(150)
    .required()
};

module.exports = userSchema;
