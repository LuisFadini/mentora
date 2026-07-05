import { schemaRef } from "@mentora/openapi-builder";

type JsonSchema = {
  type?: unknown;
  properties?: Record<string, JsonSchema>;
  items?: JsonSchema;
  $ref?: string;
};

type Schemas = Record<string, unknown>;

function isObjectSchema(schema: unknown): schema is JsonSchema {
  return typeof schema === "object" && schema !== null;
}

export function fixArrayRef(
  schemas: Schemas,
  dto: string,
  property: string,
  ref: string,
): void {
  const schema = schemas[dto];

  if (!isObjectSchema(schema)) {
    throw new Error(`Schema "${dto}" not found or invalid.`);
  }

  if (!schema.properties || typeof schema.properties !== "object") {
    throw new Error(`Schema "${dto}" has no properties.`);
  }

  const prop = schema.properties[property];

  if (!prop) {
    throw new Error(`Property "${property}" not found in "${dto}".`);
  }

  schema.properties[property] = {
    type: "array",
    items: schemaRef(ref),
  };
}
