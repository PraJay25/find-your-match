import { AnyZodObject } from "zod";
import { RequestHandler } from "express";

export const validate = (
  schema: { body?: AnyZodObject; query?: AnyZodObject; params?: AnyZodObject }
): RequestHandler =>
  (req, _res, next) => {
    try {
      if (schema.body) req.body = schema.body.parse(req.body);
      if (schema.query) req.query = schema.query.parse(req.query);
      if (schema.params) req.params = schema.params.parse(req.params);
      next();
    } catch (err) {
      next(err);
    }
  };

