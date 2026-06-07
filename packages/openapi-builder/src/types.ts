export type MethodsType = "get" | "post" | "put" | "patch" | "delete";

export interface ResponseObject {
  description: string;
  content?: Record<string, { schema: unknown }> | undefined;
  headers?: object;
}

export interface MethodDefinition {
  summary: string;
  description?: string | undefined;
  operationId: string;
  tags?: string[] | undefined;
  parameters?: unknown[] | undefined;
  requestBody?: unknown;
  responses: Record<string, ResponseObject>;
}

export type PathItem = Partial<Record<MethodsType, MethodDefinition>>;
