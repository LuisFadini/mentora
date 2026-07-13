import type { Permission, WithPermissions } from "./types.ts";

export function hasPermission(
  subject: WithPermissions,
  required: Permission | Permission[],
): boolean {
  const granted = subject.permissions ?? [];
  const requiredPermissions = Array.isArray(required) ? required : [required];

  return requiredPermissions.every((permission) =>
    granted.includes(permission),
  );
}
