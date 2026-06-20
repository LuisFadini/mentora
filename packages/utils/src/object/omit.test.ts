import { describe, expect, it } from "vitest";

import { omit } from "./omit.ts";

describe("omit", () => {
  it("removes a single key", () => {
    const obj = {
      id: 1,
      name: "John",
      email: "john@example.com",
    };

    expect(omit(obj, ["email"])).toEqual({
      id: 1,
      name: "John",
    });
  });

  it("removes multiple keys", () => {
    const obj = {
      id: 1,
      name: "John",
      email: "john@example.com",
      age: 30,
    };

    expect(omit(obj, ["email", "age"])).toEqual({
      id: 1,
      name: "John",
    });
  });

  it("does not mutate the original object", () => {
    const obj = {
      id: 1,
      name: "John",
    };

    const result = omit(obj, ["name"]);

    expect(result).toEqual({
      id: 1,
    });

    expect(obj).toEqual({
      id: 1,
      name: "John",
    });
  });

  it("returns a copy when no keys are provided", () => {
    const obj = {
      id: 1,
      name: "John",
    };

    const result = omit(obj, []);

    expect(result).toEqual(obj);
    expect(result).not.toBe(obj);
  });
});
