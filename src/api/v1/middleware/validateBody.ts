import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateBody =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: true,
      allowUnknown: false, 
    });

    if (error) {
      return res.status(400).json({
        message: `Validation error: ${error.details[0].message}`,
      });
    }

    req.body = value;
    next();
  };