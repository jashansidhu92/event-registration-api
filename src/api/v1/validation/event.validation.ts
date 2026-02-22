import Joi from "joi";

export const createEventSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),

  date: Joi.date()
    .iso()
    .required()
    .messages({
      "date.format": '"date" must be in ISO 8601 date format',
    }),

  location: Joi.string().min(2).max(100).required(),

  category: Joi.string().min(3).max(50).required(),

  capacity: Joi.number().integer().min(1).required(),

  registrationCount: Joi.number()
    .integer()
    .min(0)
    .max(Joi.ref("capacity"))
    .default(0)
    .messages({
      "number.max": '"registrationCount" must be less than or equal to capacity',
    }),

  status: Joi.string()
    .valid("active", "completed", "cancelled")
    .default("active"),
});