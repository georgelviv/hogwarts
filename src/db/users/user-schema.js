const Joi = require('joi');
const Sequelize = require('sequelize');

const userSchemaJoi = {
  name: Joi.string().min(3).max(200).required(),
  gender: Joi.any().valid('male', 'female').required(),
  age: Joi.number().integer().min(0).max(150)
    .required()
};

const userSchemaSequalize = {
  name: {
    type: Sequelize.STRING,
    validate: {
      len: [3, 200]
    }
  },
  gender: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['male', 'female']]
    }
  },
  age: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 150
    }
  },
  id: {
    unique: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  }
};

module.exports = {
  joi: userSchemaJoi,
  sequalize: userSchemaSequalize
};
