import { OpenAPISchemaBuilder, schemaRef } from "@mentora/openapi-builder";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export const schemas = {
  User: new OpenAPISchemaBuilder()
    .setDescription("User entity")
    .addProperty("id", { type: "string", format: "uuid" })
    .addProperty("name", { type: "string" }, true)
    .addProperty("email", { type: "string", format: "email" }, true)
    .addProperty("avatarUrl", { type: "string", format: "uri" })
    .addProperty("createdAt", { type: "string", format: "date-time" }, true)
    .addProperty("updatedAt", { type: "string", format: "date-time" }, true)
    .build(),
  AuthSessionResponse: new OpenAPISchemaBuilder()
    .setDescription("Session verification response")
    .addProperty("authenticated", { type: "boolean" }, true)
    .addProperty("user", schemaRef("User"))
    .build(),
  ...validationMetadatasToSchemas(),
};
