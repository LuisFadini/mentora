import {
  jsonBody,
  OpenAPIMethodBuilder,
  OpenAPIPathBuilder,
  OpenAPIResponseBuilder,
  schemaRef,
} from "@mentora/openapi-builder";

export const authPaths = new OpenAPIPathBuilder()
  .addPath(
    "/auth",
    new OpenAPIMethodBuilder()
      .addMethod("post", {
        summary: "Create a session",
        operationId: "createSession",
        responses: {
          "200": {
            description: "Session created",
            headers: {
              "set-cookie": {
                schema: {
                  type: "string",
                  example:
                    "session_token=e2ptX6Ix5q9R5ORKxTWGWi6Zw7fqbAGVXwFjoizck2M; Path=/",
                },
              },
            },
          },
          ...new OpenAPIResponseBuilder()
            .addResponse("404", "User not found")
            .addResponse("401", "Password don't match")
            .build(),
        },
        requestBody: jsonBody(schemaRef("CreateSessionDTO")),
        tags: ["Auth"],
      })
      .addMethod("delete", {
        summary: "Delete a session",
        operationId: "deleteSession",
        responses: new OpenAPIResponseBuilder()
          .addResponse("200", "Session closed successfully")
          .addResponse("400", "Error closing session"),
        tags: ["Auth"],
      }),
  )
  .build();
