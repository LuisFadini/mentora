import { describe, expect, it } from "vitest";

import { OpenAPISchemaBuilder } from "./schema-builder.ts";

describe("OpenAPISchemaBuilder", () => {
  it("should build a basic object schema", () => {
    const schema = new OpenAPISchemaBuilder().build();

    expect(schema).toEqual({
      type: "object",
      description: "",
      properties: {},
      required: [],
    });
  });

  it("should set description", () => {
    const schema = new OpenAPISchemaBuilder()
      .setDescription("User entity")
      .build();

    expect(schema.description).toBe("User entity");
  });

  it("should add a property without required flag", () => {
    const schema = new OpenAPISchemaBuilder()
      .addProperty("name", { type: "string" })
      .build();

    expect(schema.properties).toEqual({
      name: { type: "string" },
    });

    expect(schema.required).toEqual([]);
  });

  it("should add required properties", () => {
    const schema = new OpenAPISchemaBuilder()
      .addProperty("name", { type: "string" }, true)
      .addProperty("email", { type: "string", format: "email" }, true)
      .build();

    expect(schema.required).toEqual(["name", "email"]);
  });

  it("should not duplicate required properties", () => {
    const schema = new OpenAPISchemaBuilder()
      .addProperty("name", { type: "string" }, true)
      .addProperty("name", { type: "string" }, true)
      .build();

    expect(schema.required).toEqual(["name"]);
  });

  it("should build full schema correctly", () => {
    const schema = new OpenAPISchemaBuilder()
      .setDescription("User entity")
      .addProperty("id", { type: "string", format: "uuid" })
      .addProperty("name", { type: "string" }, true)
      .addProperty("email", { type: "string", format: "email" }, true)
      .addProperty("avatarUrl", { type: "string", format: "uri" })
      .addProperty("createdAt", { type: "string", format: "date-time" }, true)
      .addProperty("updatedAt", { type: "string", format: "date-time" }, true)
      .build();

    expect(schema).toEqual({
      type: "object",
      description: "User entity",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        email: { type: "string", format: "email" },
        avatarUrl: { type: "string", format: "uri" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
      required: ["name", "email", "createdAt", "updatedAt"],
    });
  });
});
