import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";
import * as uuid from "uuid";

export function validateUUIDV7Param<P extends Record<string, string>>(
  paramName: keyof P & string,
): RequestHandler<P> {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.params[paramName];

    if (
      typeof value !== "string" ||
      !uuid.validate(value) ||
      uuid.version(value) !== 7
    ) {
      return res.status(400).json({
        message: `${paramName} must be a valid UUID`,
      });
    }

    return next();
  };
}
