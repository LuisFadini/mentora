import type { ResponseObject } from "../types.ts";

export class OpenAPIResponseBuilder {
  private responses: Record<string, ResponseObject> = {};

  addResponse(
    statusCode: string,
    description: string,
    content?: Record<
      string,
      { schema?: Record<string, unknown> } | { [key: string]: unknown }
    >,
  ): this {
    this.responses[statusCode] = { description, content };
    return this;
  }

  build(): Record<string, ResponseObject> {
    return this.responses;
  }
}
