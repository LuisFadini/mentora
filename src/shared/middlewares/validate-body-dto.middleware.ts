import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import type { RequestHandler } from "express";
import { type NextFunction, type Request, type Response } from "express";

import { logger } from "../../logger.ts";

type ClassConstructor<T extends object> = {
  new (...args: unknown[]): T;
};

type ValidateOptions = {
  required?: boolean;
};

export function validateBodyDTO<T extends object>(
  Dto: ClassConstructor<T>,
  options: ValidateOptions = {},
): RequestHandler {
  const { required = true } = options;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body || Object.keys(req.body as object).length === 0) {
        if (required) {
          return res.status(400).json({
            message: "Request body is required",
          });
        }

        return next();
      }

      const data = plainToInstance(Dto, req.body);

      const errors = await validate(data, {
        whitelist: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: false,
      });

      if (errors.length > 0) {
        logger.info({ errors }, "validation failed");
        return res.status(400).json({
          message: "Validation failed",
          errors,
        });
      }

      req.body = data;

      logger.debug("validation succeed");

      next();
    } catch (err) {
      logger.error({ err }, "validation error");
      next(err);
    }
  };
}
