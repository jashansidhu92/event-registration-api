import Joi from "joi";

export const createEventSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),

  date: Joi.date().iso().greater("now").required(),

  capacity: Joi.number().integer().min(5).required(),

  status: Joi.string().valid("active", "completed", "cancelled").required(),

  category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").default("general"),

  registrationCount: Joi.number().integer().min(0).max(Joi.ref("capacity")).default(100),
});