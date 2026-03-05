import type { NextFunction, Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("uuid", () => ({
  validate: vi.fn(),
  version: vi.fn(),
}));

import * as uuid from "uuid";

import { validateUUIDV7Param } from "../../../shared/middlewares/validate-uuid.middleware.ts";

type Params = {
  id: string;
};

function createMockRequest<P extends Record<string, string>>(
  params: P,
): Request<P> {
  return {
    params,
  } as Request<P>;
}

type MockResponse = {
  status: ReturnType<typeof vi.fn>;
  json: ReturnType<typeof vi.fn>;
};

function createMockResponse(): MockResponse {
  const res: MockResponse = {
    status: vi.fn(),
    json: vi.fn(),
  };

  res.status.mockImplementation(() => res);
  res.json.mockImplementation(() => res);

  return res;
}

describe("validateUUIDV7Param", () => {
  let next: NextFunction;

  beforeEach(() => {
    next = vi.fn();
    vi.clearAllMocks();
  });

  it("should call next if uuid is valid v7", () => {
    vi.mocked(uuid.validate).mockReturnValue(true);
    vi.mocked(uuid.version).mockReturnValue(7);

    const req = createMockRequest<Params>({ id: "valid-uuid" });
    const res = createMockResponse();

    const middleware = validateUUIDV7Param<Params>("id");

    middleware(req, res as unknown as Response, next);

    expect(uuid.validate).toHaveBeenCalledWith("valid-uuid");
    expect(uuid.version).toHaveBeenCalledWith("valid-uuid");
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should return 400 if value is not a string", () => {
    const req = createMockRequest<Params>({
      id: 123 as unknown as string,
    });

    const res = createMockResponse();

    const middleware = validateUUIDV7Param<Params>("id");

    middleware(req, res as unknown as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "id must be a valid UUID",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 400 if uuid.validate returns false", () => {
    vi.mocked(uuid.validate).mockReturnValue(false);

    const req = createMockRequest<Params>({ id: "invalid" });
    const res = createMockResponse();

    const middleware = validateUUIDV7Param<Params>("id");

    middleware(req, res as unknown as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "id must be a valid UUID",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 400 if uuid version is not 7", () => {
    vi.mocked(uuid.validate).mockReturnValue(true);
    vi.mocked(uuid.version).mockReturnValue(4);

    const req = createMockRequest<Params>({ id: "valid-but-wrong-version" });
    const res = createMockResponse();

    const middleware = validateUUIDV7Param<Params>("id");

    middleware(req, res as unknown as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "id must be a valid UUID",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
