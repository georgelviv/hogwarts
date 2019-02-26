const Joi = require('joi');
const { userSchema } = require('db');

const validateUserSchema = (req, res, next) => {
  if (['POST', 'PUT'].includes(req.method)) {
    const userData = req.body;

    const { error } = Joi.validate(userData, userSchema);
    if (error) {
      const errorsList = error.details.map((err) => {
        return err.message;
      }).join(', ');

      const err = {
        error: true,
        statusCode: 400,
        msg: `Wrong body schema. Next errors: ${errorsList}`
      };
      throw err;
    }
  }
  next();
};

module.exports = validateUserSchema;
