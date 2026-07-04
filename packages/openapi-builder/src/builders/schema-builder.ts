type SchemaObject =
  | {
      type: "string";
      format?: "uuid" | "email" | "uri" | "date-time" | "date";
    }
  | {
      type: "boolean";
    }
  | {
      type: "array";
      items: SchemaObject | { $ref: string };
    }
  | {
      $ref: string;
    };

type PropertyMap = Record<string, SchemaObject>;

type OpenAPIObjectSchema = {
  type: "object";
  description?: string;
  properties: PropertyMap;
  required?: string[];
};

export class OpenAPISchemaBuilder {
  private properties: PropertyMap = {};
  private requiredProperties: string[] = [];
  private description: string = "";

  addProperty(name: string, schema: SchemaObject, required = false): this {
    this.properties[name] = schema;

    if (required && !this.requiredProperties.includes(name)) {
      this.requiredProperties.push(name);
    }

    return this;
  }

  setDescription(description: string): this {
    this.description = description;
    return this;
  }

  build(): OpenAPIObjectSchema {
    return {
      type: "object",
      description: this.description,
      properties: this.properties,
      required: this.requiredProperties,
    };
  }
}
