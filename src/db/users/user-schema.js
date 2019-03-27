const Joi = require('joi');
const Sequelize = require('sequelize');

const userSchemaJoi = {
  name: Joi.string().min(3).max(200).required(),
  gender: Joi.any().valid('male', 'female').required(),
  age: Joi.number().integer().min(0).max(150)
    .required()
};

const userSchemaSequelize = {
  name: {
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

module.exports = {
  joi: userSchemaJoi,
  sequelize: userSchemaSequelize
};
