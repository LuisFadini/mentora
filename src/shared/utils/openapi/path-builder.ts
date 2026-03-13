import { OpenAPIMethodBuilder } from "./method-builder.ts";
import type { PathItem } from "./types.ts";

export class OpenAPIPathBuilder {
  private paths: Record<string, PathItem> = {};

  addPath(path: string, methods: OpenAPIMethodBuilder | PathItem): this {
    const built =
      methods instanceof OpenAPIMethodBuilder ? methods.build() : methods;

    if (!this.paths[path]) {
      this.paths[path] = {};
    }

    Object.assign(this.paths[path], built);

    return this;
  }

  build(): Record<string, PathItem> {
    return this.paths;
  }
}
