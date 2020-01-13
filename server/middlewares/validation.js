const Joi = require('@hapi/joi');

const register = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .max(32)
    .required(),
  confirmPassword: Joi.string()
    .required()
    .equal(Joi.ref('password'))
});

const login = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required()
});

const schemas = {
  register,
  login
};

const validate = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property]);
  if (!error) {
    return next();
  }
  console.log(error);
};

module.exports = {
  schemas,
  validate
};
