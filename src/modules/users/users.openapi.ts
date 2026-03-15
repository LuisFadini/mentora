export const usersPaths = {
  "/users": {
    get: {
      summary: "List users",
      operationId: "getUsers",
      tags: ["Users"],
      responses: {
        "200": {
          description: "List of users",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
    },

    post: {
      summary: "Create user",
      operationId: "createUser",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateUserDTO",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        "400": {
          description: "Invalid request body",
        },
      },
    },
  },

  "/users/{id}": {
    get: {
      summary: "Get user by ID",
      operationId: "getUser",
      tags: ["Users"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "User UUID",
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      responses: {
        "200": {
          description: "User found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        "404": {
          description: "User not found",
        },
      },
    },

    patch: {
      summary: "Update user",
      operationId: "updateUser",
      tags: ["Users"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "User UUID",
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateUserDTO",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "User updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        "400": {
          description: "Invalid request body",
        },
        "404": {
          description: "User not found",
        },
      },
    },
  },
};
