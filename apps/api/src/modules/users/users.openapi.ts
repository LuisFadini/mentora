import {
  jsonBody,
  jsonContent,
  OpenAPIMethodBuilder,
  OpenAPIPathBuilder,
  OpenAPIResponseBuilder,
  schemaRef,
} from "@mentora/openapi-builder";

export const usersPaths = new OpenAPIPathBuilder()
  .addPath(
    "/users",
    new OpenAPIMethodBuilder()
      .addMethod("get", {
        summary: "List users",
        operationId: "getUsers",
        responses: new OpenAPIResponseBuilder().addResponse(
          "200",
          "List of users",
          jsonContent(schemaRef("User")),
        ),
        tags: ["Users"],
      })
      .addMethod("post", {
        summary: "Create user",
        operationId: "createUser",
        responses: new OpenAPIResponseBuilder()
          .addResponse("201", "User created", jsonContent(schemaRef("User")))
          .addResponse("400", "Invalid request body")
          .addResponse("409", "Email already in use"),
        tags: ["Users"],
        requestBody: jsonBody(schemaRef("CreateUserDTO")),
      }),
  )
  .addPath(
    "/users/{id}",
    new OpenAPIMethodBuilder()
      .addMethod("get", {
        summary: "Get user by ID",
        operationId: "getUser",
        responses: new OpenAPIResponseBuilder()
          .addResponse("200", "User found", jsonContent(schemaRef("User")))
          .addResponse("404", "User not found"),
        tags: ["Users"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "User UUID",
            schema: { type: "string", format: "uuid" },
          },
        ],
      })
      .addMethod("patch", {
        summary: "Update user",
        operationId: "updateUser",
        responses: new OpenAPIResponseBuilder()
          .addResponse("200", "User updated", jsonContent(schemaRef("User")))
          .addResponse("400", "Invalid request body")
          .addResponse("404", "User not found")
          .addResponse("409", "Email already in use"),
        tags: ["Users"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "User UUID",
            schema: { type: "string", format: "uuid" },
          },
        ],
        requestBody: jsonBody(schemaRef("UpdateUserDTO")),
      }),
  )
  .build();
