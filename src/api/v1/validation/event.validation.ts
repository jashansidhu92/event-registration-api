import Joi from "joi";

const categoryEnum = [
  "seminar",
  "general",
  "meetup",
  "workshop",
  "conference",
];

export const createEventSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),

  date: Joi.date().iso().greater("now").required(),

  capacity: Joi.number().integer().min(5).required(),

  status: Joi.string()
    .valid("active", "cancelled")
    .required(),

  category: Joi.string()
    .valid(...categoryEnum)
    .default("general"), 

  registrationCount: Joi.number()
    .integer()
    .min(0)
    .max(Joi.ref("capacity"))
    .default(0),
}).options({
  abortEarly: true,
  allowUnknown: false, 
});

export const updateEventSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),

  date: Joi.date().iso().greater("now").optional(),

  capacity: Joi.number().integer().min(5).optional(),

  status: Joi.string()
    .valid("active", "cancelled")
    .optional(),

  category: Joi.string()
    .valid(...categoryEnum)
    .optional(),

  registrationCount: Joi.number()
    .integer()
    .min(0)
    .optional(),
}).options({
  abortEarly: true,
  allowUnknown: false,
});