import { OpenAPIResponseBuilder } from "./response-builder.ts";
import type { MethodDefinition, MethodsType, ResponseObject } from "./types.ts";

type MethodBuilderOptions = {
  summary: string;
  operationId: string;
  responses: OpenAPIResponseBuilder | Record<string, ResponseObject>;
  tags?: string[];
  description?: string;
  parameters?: unknown[];
  requestBody?: unknown;
};

export class OpenAPIMethodBuilder {
  private methods: Partial<Record<MethodsType, MethodDefinition>> = {};

  addMethod(methodType: MethodsType, config: MethodBuilderOptions): this {
    const responses =
      config.responses instanceof OpenAPIResponseBuilder
        ? config.responses.build()
        : config.responses;

    this.methods[methodType] = {
      ...config,
      responses,
    };

    return this;
  }

  build(): Partial<Record<MethodsType, MethodDefinition>> {
    return this.methods;
  }
}
