import type { RequestHandler } from "express";

export function validateNumberParam<P extends Record<string, string>>(
  paramName: keyof P & string,
): RequestHandler<P> {
  return (req, res, next) => {
    const value = req.params[paramName];
    const number = Number(value);

    if (
      typeof value !== "string" ||
      value.trim() === "" ||
      !Number.isSafeInteger(number) ||
      number <= 0
    ) {
      return res.status(400).json({
        message: `${paramName} must be a positive integer`,
      });
    }

    return next();
  };
}
