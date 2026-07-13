import { hasPermission, type Permission } from "@mentora/permissions";
import type { NextFunction, Request, Response } from "express";

export function requirePermission(permission: Permission) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (!hasPermission(req.user, permission)) {
      return res.status(403).json({
        message: `Missing permission: ${permission}`,
      });
    }

    return next();
  };
}

export function requirePermissions(permissions: Permission[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user)
      return res.status(401).json({
        message: "Authentication required",
      });

    const missingPermissions = permissions.filter(
      (permission) => !hasPermission(req.user!, permission),
    );

    if (missingPermissions.length > 0) {
      return res.status(403).json({
        message: "Missing required permissions",
        missingPermissions,
      });
    }

    return next();
  };
}

export function requireAnyPermission(permissions: Permission[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const hasAnyPermission = permissions.some((permission) =>
      hasPermission(req.user!, permission),
    );

    if (!hasAnyPermission) {
      return res.status(403).json({
        message: "Missing any required permission",
        requiredPermissions: permissions,
      });
    }

    return next();
  };
}
