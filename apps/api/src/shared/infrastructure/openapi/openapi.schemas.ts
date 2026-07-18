import { OpenAPISchemaBuilder, schemaRef } from "@mentora/openapi-builder";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

import { fixArrayRef } from "./utils.ts";

const classValidatorSchemas = validationMetadatasToSchemas();

fixArrayRef(
  classValidatorSchemas,
  "CreateQuestionDTO",
  "answers",
  "CreateAnswerDTO",
);

fixArrayRef(
  classValidatorSchemas,
  "UpdateQuestionDTO",
  "answers",
  "UpdateAnswerDTO",
);

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

  Question: new OpenAPISchemaBuilder()
    .setDescription("Question entity")
    .addProperty("id", { type: "string", format: "uuid" })
    .addProperty("title", { type: "string" }, true)
    .addProperty(
      "subjects",
      {
        type: "array",
        items: { type: "string" },
      },
      true,
    )
    .addProperty("content", { type: "string" }, true)
    .addProperty(
      "answers",
      {
        type: "array",
        items: schemaRef("Answer"),
      },
      true,
    )
    .addProperty("createdAt", { type: "string", format: "date-time" }, true)
    .addProperty("updatedAt", { type: "string", format: "date-time" }, true)
    .build(),

  Answer: new OpenAPISchemaBuilder()
    .setDescription("Answer entity")
    .addProperty("id", { type: "string", format: "uuid" })
    .addProperty("questionId", { type: "string", format: "uuid" })
    .addProperty("correct", { type: "boolean" }, true)
    .addProperty("content", { type: "string" }, true)
    .addProperty("createdAt", { type: "string", format: "date-time" }, true)
    .addProperty("updatedAt", { type: "string", format: "date-time" }, true)
    .build(),

  ValidateQuestionResponse: new OpenAPISchemaBuilder()
    .setDescription("Question validation response")
    .addProperty("correct", { type: "boolean" }, true)
    .addProperty("correctAnswerId", { type: "string", format: "uuid" }, true)
    .build(),

  QuestionTip: new OpenAPISchemaBuilder()
    .setDescription("Question tip entity")
    .addProperty("id", { type: "string", format: "uuid" })
    .addProperty("questionId", { type: "string", format: "uuid" })
    .addProperty("order", { type: "integer", minimum: 0 }, true)
    .addProperty("content", { type: "string" }, true)
    .addProperty("createdAt", { type: "string", format: "date-time" }, true)
    .addProperty("updatedAt", { type: "string", format: "date-time" }, true)
    .build(),
  // export type QuestionTip = {
  //   id?: string;
  //   questionId?: string;
  //   order: number;
  //   content: string;
  //   createdAt: Date;
  //   updatedAt: Date;
  // };

  ...classValidatorSchemas,
};
