import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export const schemas = {
  User: {
    type: "object",
    description: "User entity",
    properties: {
      id: {
        type: "string",
        format: "uuid",
      },
      name: {
        type: "string",
      },
      email: {
        type: "string",
        format: "email",
      },
      avatarUrl: {
        type: "string",
        format: "uri",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
    required: ["name", "email", "createdAt", "updatedAt"],
  },
  ...validationMetadatasToSchemas(),
};
