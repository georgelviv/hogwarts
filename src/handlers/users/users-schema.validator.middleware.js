const Joi = require('joi');
const { userSchema } = require('db');

const validateUserSchema = (req, res, next) => {
  if (['POST', 'PUT'].includes(req.method)) {
    const userData = req.body;

    const { error } = Joi.validate(userData, userSchema.joi);
    if (error) {
      const errorsList = error.details.map((err) => {
        return err.message;
      }).join(', ');

      res.status(400).send(`Wrong body schema. Next errors: ${errorsList}`);
    }
  }
  next();
};

module.exports = validateUserSchema;
