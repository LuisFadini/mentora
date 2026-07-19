import type { NextFunction, Request, RequestHandler, Response } from "express";
import * as uuid from "uuid";

export function requireSelfParam<P extends Record<string, string>>(
  paramName: keyof P & string,
): RequestHandler<P> {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.params[paramName];

    if (value === "me") {
      req.params[paramName] = req.user!.id!;
      return next();
    }

    if (
      typeof value !== "string" ||
      !uuid.validate(value) ||
      uuid.version(value) !== 7
    ) {
      return res.status(400).json({
        message: `${paramName} must be a valid UUID or "me"`,
      });
    }

    if (req.user?.id !== value) {
      return res.status(403).json({
        message: "You can only access your own user.",
      });
    }

    return next();
  };
}
