export const schemaRef = (name: string) => ({
  $ref: `#/components/schemas/${name}`,
});

const mediaContent = (type: string, schema: unknown) => ({
  [type]: { schema },
});

export const jsonContent = (schema: unknown) =>
  mediaContent("application/json", schema);

export const jsonResponse = jsonContent;

export const jsonBody = (schema: unknown, required = true) => ({
  required,
  content: jsonContent(schema),
});
