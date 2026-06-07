import { describe, expect, it } from "vitest";

import { OpenAPIMethodBuilder } from "./method-builder.ts";
import { OpenAPIResponseBuilder } from "./response-builder.ts";

describe("OpenAPIMethodBuilder", () => {
  it("adds a method definition", () => {
    const methods = new OpenAPIMethodBuilder()
      .addMethod("get", {
        summary: "Get users",
        operationId: "getUsers",
        responses: {
          "200": {
            description: "Success",
          },
        },
      })
      .build();

    expect(methods).toEqual({
      get: {
        summary: "Get users",
        operationId: "getUsers",
        responses: {
          "200": {
            description: "Success",
          },
        },
      },
    });
  });

  it("supports multiple methods", () => {
    const methods = new OpenAPIMethodBuilder()
      .addMethod("get", {
        summary: "Get users",
        operationId: "getUsers",
        responses: {
          "200": {
            description: "Success",
          },
        },
      })
      .addMethod("post", {
        summary: "Create user",
        operationId: "createUser",
        responses: {
          "201": {
            description: "Created",
          },
        },
      })
      .build();

    expect(methods).toEqual({
      get: {
        summary: "Get users",
        operationId: "getUsers",
        responses: {
          "200": {
            description: "Success",
          },
        },
      },
      post: {
        summary: "Create user",
        operationId: "createUser",
        responses: {
          "201": {
            description: "Created",
          },
        },
      },
    });
  });

  it("builds responses from OpenAPIResponseBuilder", () => {
    const responseBuilder = new OpenAPIResponseBuilder().addResponse(
      "200",
      "Success",
    );

    const methods = new OpenAPIMethodBuilder()
      .addMethod("get", {
        summary: "Get users",
        operationId: "getUsers",
        responses: responseBuilder,
      })
      .build();

    expect(methods.get?.responses).toEqual({
      "200": {
        description: "Success",
      },
    });
  });

  it("preserves optional properties", () => {
    const methods = new OpenAPIMethodBuilder()
      .addMethod("post", {
        summary: "Create user",
        operationId: "createUser",
        description: "Creates a new user",
        tags: ["Users"],
        parameters: [{ name: "id" }],
        requestBody: { required: true },
        responses: {
          "201": {
            description: "Created",
          },
        },
      })
      .build();

    expect(methods.post).toMatchObject({
      summary: "Create user",
      operationId: "createUser",
      description: "Creates a new user",
      tags: ["Users"],
      parameters: [{ name: "id" }],
      requestBody: { required: true },
    });
  });

  it("returns itself to allow chaining", () => {
    const builder = new OpenAPIMethodBuilder();

    const result = builder.addMethod("get", {
      summary: "Get users",
      operationId: "getUsers",
      responses: {
        "200": {
          description: "Success",
        },
      },
    });

    expect(result).toBe(builder);
  });
});
