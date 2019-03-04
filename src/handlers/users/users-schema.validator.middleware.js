const Joi = require('joi');
const { userSchema } = require('db');
const { getApiMessage } = require('helpers');
const { API_MESSAGES_TYPES } = require('constants');

const validateUserSchema = (req, res, next) => {
  if (['POST', 'PUT'].includes(req.method)) {
    const userData = req.body;

    const { error } = Joi.validate(userData, userSchema.joi);
    if (error) {
      const errorsList = error.details.map((err) => {
        return err.message;
      }).join(', ');

      const msg = `Wrong body schema. Next errors: ${errorsList}`;
      const response = getApiMessage(msg, API_MESSAGES_TYPES.error);

      res.status(400).send(response);
    }
  }
  next();
};

module.exports = validateUserSchema;
