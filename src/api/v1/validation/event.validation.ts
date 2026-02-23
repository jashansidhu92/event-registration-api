import Joi from "joi";

export const createEventSchema = Joi.object({
  name: Joi.string().required(),
  date: Joi.string().isoDate().required(),
  location: Joi.string().required(),
  capacity: Joi.number().integer().min(1).required(),
  category: Joi.string().valid("conference","workshop","meetup","seminar","general").required(),
  registrationCount: Joi.number().integer().min(0).default(0),
  status: Joi.string().valid("active","completed","cancelled").default("active"),
}).required();