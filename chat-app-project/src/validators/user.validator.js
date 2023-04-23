import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    fullname: Joi.string().min(6).required(),
    email: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
    pic: Joi.string(),
    isAdmin: Joi.boolean()
  }); 
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
