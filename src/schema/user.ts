import Joi from "joi";

export const getUserQuerySchema = Joi.object({
  q: Joi.string().optional(),

  page: Joi.number().optional().messages({
    "number.base": "Page must be a number",
  }),
}).options({
  stripUnknown: true,
});

export const createUserBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),

  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid format",
  }),

  password: Joi.string()
    .required()
    .min(8)
    .messages({
      "any.required": "Password is required",
      "string.min": "Password must be atleast 8 characters",
      "password.uppercase":
        "Password must have atleast one uppercase character",
      "password.lowercase":
        "Password must have atleast one lowercase character",
      "password.special": "Password must have atleast one special character",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }

      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }

      if (!/[!@#$%]/.test(value)) {
        return helpers.error("password.special");
      }

      return value;
    }),
}).options({
  stripUnknown: true,
});
