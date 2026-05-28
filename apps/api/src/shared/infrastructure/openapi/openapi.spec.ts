import { paths } from "./openapi.paths.ts";
import { schemas } from "./openapi.schemas.ts";

export const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "API",
    version: "0.1.0",
  },
  paths,
  components: {
    schemas,
  },
};
