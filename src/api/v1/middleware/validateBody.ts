import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const validateBody =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: true,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      return res.status(400).json({
        message: `Validation error: ${error.details[0].message}`,
      });
    }

    req.body = value;

    next();
  };