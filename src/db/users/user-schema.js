const Joi = require('joi');
const Sequelize = require('sequelize');

const userSchemaJoi = {
  firstName: Joi.string().min(3).max(200).required(),
  lastName: Joi.string().min(3).max(200).required(),
  gender: Joi.any().valid('male', 'female').required(),
  age: Joi.number().integer().min(0).max(150)
    .required()
};

const userSchemaSequelize = {
  firstName: {
    type: Sequelize.STRING,
    validate: {
      len: [3, 200]
    },
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    validate: {
      len: [3, 200]
    },
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['male', 'female']]
    },
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 150
    },
    allowNull: false
  },
  createdAt: {
    type: Sequelize.TIME,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.TIME,
    allowNull: false
  },
  id: {
    unique: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  }
};

class User extends Sequelize.Model {}

module.exports = {
  User,
  joi: userSchemaJoi,
  sequelize: userSchemaSequelize
};
