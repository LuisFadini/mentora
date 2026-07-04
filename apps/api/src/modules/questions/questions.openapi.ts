import {
  jsonBody,
  jsonContent,
  OpenAPIMethodBuilder,
  OpenAPIPathBuilder,
  OpenAPIResponseBuilder,
  schemaRef,
} from "@mentora/openapi-builder";

export const questionsPaths = new OpenAPIPathBuilder()
  .addPath(
    "/questions",
    new OpenAPIMethodBuilder()
      .addMethod("get", {
        summary: "List questions",
        operationId: "getQuestions",
        tags: ["Questions"],
        responses: new OpenAPIResponseBuilder().addResponse(
          "200",
          "List of questions",
          jsonContent({
            type: "array",
            items: schemaRef("Question"),
          }),
        ),
      })
      .addMethod("post", {
        summary: "Create question",
        operationId: "createQuestion",
        tags: ["Questions"],
        requestBody: jsonBody(schemaRef("CreateQuestionDTO")),
        responses: new OpenAPIResponseBuilder()
          .addResponse(
            "201",
            "Question created",
            jsonContent(schemaRef("Question")),
          )
          .addResponse("400", "Invalid request body"),
      }),
  )
  .addPath(
    "/questions/{id}",
    new OpenAPIMethodBuilder()
      .addMethod("get", {
        summary: "Get question by ID",
        operationId: "getQuestion",
        tags: ["Questions"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Question ID",
            schema: {
              type: "string",
            },
          },
        ],
        responses: new OpenAPIResponseBuilder()
          .addResponse(
            "200",
            "Question found",
            jsonContent(schemaRef("Question")),
          )
          .addResponse("404", "Question not found"),
      })
      .addMethod("put", {
        summary: "Update question",
        operationId: "updateQuestion",
        tags: ["Questions"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Question ID",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: jsonBody(schemaRef("UpdateQuestionDTO")),
        responses: new OpenAPIResponseBuilder()
          .addResponse(
            "200",
            "Question updated",
            jsonContent(schemaRef("Question")),
          )
          .addResponse("400", "Invalid request body")
          .addResponse("404", "Question not found"),
      }),
  )
  .addPath(
    "/questions/{id}/validate",
    new OpenAPIMethodBuilder().addMethod("post", {
      summary: "Validate a question answer",
      operationId: "validateQuestion",
      tags: ["Questions"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Question ID",
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: jsonBody(schemaRef("ValidateQuestionDTO")),
      responses: new OpenAPIResponseBuilder()
        .addResponse(
          "200",
          "Validation result",
          jsonContent(schemaRef("ValidateQuestionResponse")),
        )
        .addResponse("404", "Question not found"),
    }),
  )
  .build();
