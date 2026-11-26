import { type Request, type Response, Router } from "express";
import yaml from "yaml";

import { config as envConfig } from "../../../config/env.ts";
import { openApiSpec } from "./openapi.spec.ts";

export function createOpenAPiRoutes(): Router {
  const router = Router();

  router.get("/openapi.json", (_req: Request, res: Response) => {
    res.json(openApiSpec);
  });

  router.get("/openapi.yaml", (_req: Request, res: Response) => {
    const yamlSpec = yaml.stringify(openApiSpec);

    res.setHeader("Content-Type", "application/yaml");
    res.send(yamlSpec);
  });

  router.get("/", (_req: Request, res: Response) => {
    const config = {
      url: envConfig.isDevelopment ? "/openapi.json" : "/api/openapi.json",
      hideClientButton: true,
      telemetry: false,
      showDeveloperTools: "never",
      orderSchemaPropertiesBy: "preserve",
      mcp: { disabled: true },
      agent: {
        disabled: true,
      },
      hiddenClients: {
        c: true,
        clojure: true,
        csharp: true,
        fsharp: true,
        go: true,
        http: true,
        java: true,
        js: ["jquery", "ofetch", "xhr"],
        node: true,
        objc: true,
        ocaml: true,
        php: true,
        powershell: true,
        python: ["httpx_async", "httpx_sync", "python3"],
        r: true,
        ruby: true,
        rust: true,
        shell: ["httpie", "wget"],
      },
    };

    res.send(`
      <!doctype html>
      <html>
        <head>
          <title>Scalar API Reference</title>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1" />
        </head>

        <body>
          <div id="app"></div>

          <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
          <script>
            Scalar.createApiReference('#app', ${JSON.stringify(config)})
          </script>
        </body>
      </html>`);
  });

  return router;
}
