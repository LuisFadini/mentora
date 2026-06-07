import { describe, expect, it } from "vitest";

import { OpenAPIResponseBuilder } from "../builders/response-builder.ts";

describe("OpenAPIResponseBuilder", () => {
  it("adds a response without content", () => {
    const responses = new OpenAPIResponseBuilder()
      .addResponse("200", "Success")
      .build();

    expect(responses).toEqual({
      "200": {
        description: "Success",
        content: undefined,
      },
    });
  });

  it("adds a response with content", () => {
    const content = {
      "application/json": {
        schema: {
          type: "object",
        },
      },
    };

    const responses = new OpenAPIResponseBuilder()
      .addResponse("200", "Success", content)
      .build();

    expect(responses).toEqual({
      "200": {
        description: "Success",
        content,
      },
    });
  });

  it("supports multiple responses", () => {
    const responses = new OpenAPIResponseBuilder()
      .addResponse("200", "Success")
      .addResponse("404", "Not Found")
      .build();

    expect(responses).toEqual({
      "200": {
        description: "Success",
        content: undefined,
      },
      "404": {
        description: "Not Found",
        content: undefined,
      },
    });
  });

  it("overwrites an existing response for the same status code", () => {
    const responses = new OpenAPIResponseBuilder()
      .addResponse("200", "Old description")
      .addResponse("200", "New description")
      .build();

    expect(responses).toEqual({
      "200": {
        description: "New description",
        content: undefined,
      },
    });
  });

  it("returns itself to allow chaining", () => {
    const builder = new OpenAPIResponseBuilder();

    const result = builder.addResponse("200", "Success");

    expect(result).toBe(builder);
  });
});
