const Joi = require('joi');

const { getApiMessage } = require('helpers');
const { API_MESSAGES_TYPES } = require('constants');
const { userSchema } = require('db');

const handleError = (res, statusCode, msg) => {
  const response = getApiMessage(msg, API_MESSAGES_TYPES.error);
  res.status(statusCode).json(response);
};

const handleData = (res, data) => {
  const response = getApiMessage(data, API_MESSAGES_TYPES.data);
  res.send(response);
};

const handleEmptyData = (res, msg) => {
  const response = getApiMessage(msg, API_MESSAGES_TYPES.info);
  res.send(response);
};

const validateUserSchema = (req, res, next) => {
  if (['POST', 'PUT'].includes(req.method)) {
    const userData = req.body;

    const { error } = Joi.validate(userData, userSchema);
    if (error) {
      const errorsList = error.details.map((err) => {
        return err.message;
      }).join(', ');
      handleError(res, 400, `Wrong body schema. Next errors: ${errorsList}`);
      return;
    }
  }
  next();
};

module.exports = {
  handleError,
  handleData,
  handleEmptyData,
  validateUserSchema
};
