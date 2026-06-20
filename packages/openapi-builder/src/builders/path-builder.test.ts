import { describe, expect, it } from "vitest";

import { OpenAPIMethodBuilder } from "./method-builder.ts";
import { OpenAPIPathBuilder } from "./path-builder.ts";

describe("OpenAPIPathBuilder", () => {
  it("adds a path from a PathItem object", () => {
    const paths = new OpenAPIPathBuilder()
      .addPath("/users", {
        get: {
          summary: "Get users",
          operationId: "getUsers",
          responses: {},
        },
      })
      .build();

    expect(paths).toEqual({
      "/users": {
        get: {
          summary: "Get users",
          operationId: "getUsers",
          responses: {},
        },
      },
    });
  });

  it("adds a path from an OpenAPIMethodBuilder", () => {
    const methods = new OpenAPIMethodBuilder().addMethod("get", {
      summary: "Get users",
      operationId: "getUsers",
      responses: {},
    });

    const paths = new OpenAPIPathBuilder().addPath("/users", methods).build();

    expect(paths).toEqual({
      "/users": {
        get: {
          summary: "Get users",
          operationId: "getUsers",
          responses: {},
        },
      },
    });
  });

  it("supports multiple paths", () => {
    const paths = new OpenAPIPathBuilder()
      .addPath("/users", {
        get: {
          summary: "Get users",
          operationId: "getUsers",
          responses: {},
        },
      })
      .addPath("/posts", {
        get: {
          summary: "Get posts",
          operationId: "getPosts",
          responses: {},
        },
      })
      .build();

    expect(paths).toEqual({
      "/users": {
        get: {
          summary: "Get users",
          operationId: "getUsers",
          responses: {},
        },
      },
      "/posts": {
        get: {
          summary: "Get posts",
          operationId: "getPosts",
          responses: {},
        },
      },
    });
  });

  it("merges methods into an existing path", () => {
    const paths = new OpenAPIPathBuilder()
      .addPath("/users", {
        get: {
          summary: "Get users",
          operationId: "getUsers",
          responses: {},
        },
      })
      .addPath("/users", {
        post: {
          summary: "Create user",
          operationId: "createUser",
          responses: {},
        },
      })
      .build();

    expect(paths).toEqual({
      "/users": {
        get: {
          summary: "Get users",
          operationId: "getUsers",
          responses: {},
        },
        post: {
          summary: "Create user",
          operationId: "createUser",
          responses: {},
        },
      },
    });
  });

  it("overwrites an existing method on the same path", () => {
    const paths = new OpenAPIPathBuilder()
      .addPath("/users", {
        get: {
          summary: "Old summary",
          operationId: "oldOperation",
          responses: {},
        },
      })
      .addPath("/users", {
        get: {
          summary: "New summary",
          operationId: "newOperation",
          responses: {},
        },
      })
      .build();

    expect(paths["/users"]?.get).toMatchObject({
      summary: "New summary",
      operationId: "newOperation",
    });
  });

  it("returns itself to allow chaining", () => {
    const builder = new OpenAPIPathBuilder();

    const result = builder.addPath("/users", {});

    expect(result).toBe(builder);
  });
});
