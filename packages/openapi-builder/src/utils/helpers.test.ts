import { describe, expect, it } from "vitest";

import { jsonBody, jsonContent, jsonResponse, schemaRef } from "./helpers.ts";

describe("schemaRef", () => {
  it("creates an OpenAPI schema reference", () => {
    expect(schemaRef("User")).toEqual({
      $ref: "#/components/schemas/User",
    });
  });

  it("supports any schema name", () => {
    expect(schemaRef("CreateUserDTO")).toEqual({
      $ref: "#/components/schemas/CreateUserDTO",
    });
  });
});

describe("jsonContent", () => {
  it("wraps a schema in application/json content", () => {
    const schema = schemaRef("User");

    expect(jsonContent(schema)).toEqual({
      "application/json": {
        schema,
      },
    });
  });

  it("preserves the provided schema object", () => {
    const schema = {
      type: "object",
      properties: {
        name: { type: "string" },
      },
    };

    expect(jsonContent(schema)).toEqual({
      "application/json": {
        schema,
      },
    });
  });
});

describe("jsonResponse", () => {
  it("is an alias of jsonContent", () => {
    const schema = schemaRef("User");

    expect(jsonResponse(schema)).toEqual(jsonContent(schema));
  });
});

describe("jsonBody", () => {
  it("creates a required request body by default", () => {
    const schema = schemaRef("CreateUserDTO");

    expect(jsonBody(schema)).toEqual({
      required: true,
      content: {
        "application/json": {
          schema,
        },
      },
    });
  });

  it("allows optional request bodies", () => {
    const schema = schemaRef("UpdateUserDTO");

    expect(jsonBody(schema, false)).toEqual({
      required: false,
      content: {
        "application/json": {
          schema,
        },
      },
    });
  });
});
