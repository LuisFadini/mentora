import type { permissions } from "./permissions.ts";

type ValueOf<T> = T[keyof T];

type DeepValueOf<T> = T extends string
  ? T
  : T extends object
    ? DeepValueOf<ValueOf<T>>
    : never;

export type Permission = DeepValueOf<typeof permissions>;

export interface WithPermissions {
  permissions?: Permission[] | null;
}
