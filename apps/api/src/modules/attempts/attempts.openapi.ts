import {
  jsonBody,
  jsonContent,
  OpenAPIMethodBuilder,
  OpenAPIPathBuilder,
  OpenAPIResponseBuilder,
  schemaRef,
} from "@mentora/openapi-builder";

export const attemptsPaths = new OpenAPIPathBuilder()
  .addPath(
    "/attempts",
    new OpenAPIMethodBuilder()
      .addMethod("get", {
        summary: "List attempts",
        operationId: "getAttempts",
        responses: new OpenAPIResponseBuilder().addResponse(
          "200",
          "List of attempts",
          jsonContent({
            type: "array",
            items: schemaRef("Attempt"),
          }),
        ),
        tags: ["Attempts"],
      })
      .addMethod("post", {
        summary: "Create attempt",
        operationId: "createAttempt",
        responses: new OpenAPIResponseBuilder()
          .addResponse(
            "201",
            "Attempt created",
            jsonContent(schemaRef("Attempt")),
          )
          .addResponse("400", "Invalid request body"),
        tags: ["Attempts"],
        requestBody: jsonBody(schemaRef("CreateAttemptDTO")),
      }),
  )
  .addPath(
    "/attempts/{id}",
    new OpenAPIMethodBuilder()
      .addMethod("get", {
        summary: "Get attempt by ID",
        operationId: "getAttempt",
        responses: new OpenAPIResponseBuilder()
          .addResponse(
            "200",
            "Attempt found",
            jsonContent(schemaRef("Attempt")),
          )
          .addResponse("404", "Attempt not found"),
        tags: ["Attempts"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Attempt UUID",
            schema: { type: "string", format: "uuid" },
          },
        ],
      })
      .addMethod("delete", {
        summary: "Delete attempt",
        operationId: "deleteAttempt",
        responses: new OpenAPIResponseBuilder()
          .addResponse("200", "Attempt deleted")
          .addResponse("404", "Attempt not found"),
        tags: ["Attempts"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Attempt UUID",
            schema: { type: "string", format: "uuid" },
          },
        ],
      }),
  )
  .addPath(
    "/attempts/user/{userId}",
    new OpenAPIMethodBuilder().addMethod("get", {
      summary: "Get attempts by user",
      operationId: "getAttemptsByUser",
      responses: new OpenAPIResponseBuilder().addResponse(
        "200",
        "List of attempts",
        jsonContent({
          type: "array",
          items: schemaRef("Attempt"),
        }),
      ),
      tags: ["Attempts"],
      parameters: [
        {
          name: "userId",
          in: "path",
          required: true,
          description: "User UUID",
          schema: { type: "string", format: "uuid" },
        },
      ],
    }),
  )
  .build();
